const express = require('express');
const {Comment,User,Post} = require('../models');
const router = express.Router();

router.post("/", async(req,res) =>{
    const {userId,postId,votes,body} = req.body
    try{
        const user = await User.findOne({
            where: {id: userId}
        });
        if(!user){
        throw "User nije pronadjen"
        }
       const post=await Post.findOne({
            where: {id:postId}
        })
        if (!post){
            throw "Post nije pronadjen"
        }
        const comments = await Comment.create({userId:user.id ,postId:post.id,votes,body});
        if (!comments){
            throw "Nema komentara";
        }
        return res.json(comments);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }})
router.put("/:id", async(req,res) =>{
    const id = req.params.id;
    const { body} = req.body;
    try{
        const comments = await Comment.findOne({
            where: {id}
        });
        comments.body = body;
        await comments.save();
        return res.json(comments);

    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
router.get("/:id", async(req,res) =>{
    try{
        const id=req.params.id;
        const comments = await Comment.findOne({where:{id}});
        return res.json(comments);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.get("/", async(req,res) =>{
    try{
        const offset=req.body.offset;
        const id=req.body.id;
        const comments = await Comment.findAll({
            where:{postId:id},
            limit:10,
            offset:{offset}||10
        }
            );
        return res.json(comments);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.delete("/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const comments = await Comment.findOne({
            where: {id}
        });
        await comments.destroy();
        return res.json({message: "Comment Deleted"});
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
module.exports=router;