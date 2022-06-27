const express = require('express');
const {Comment,User,Post} = require('../models');
const router = express.Router();
const auth=require('../middleware/auth');
const checkPermissions = require('../utils/helpers');

router.post("/", auth,async(req,res) =>{
    const {postId,votes,body} = req.body
    try{
        const user = await User.findOne({
            where: {id: req.user.id}
        });
        if(!user){
        throw "User nije pronadjen"
        }
    console.log(postId);
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
router.put("/:id",auth, async(req,res) =>{
    const id = req.params.id;
    const { body} = req.body;
    try{
        const comment = await Comment.findOne({
            where: {id}, include: {model: User, as: 'user'}
        });

        if(!checkPermissions(comment.user, req.user)) {
            return res.status(403).json({err:"Forbidden"});
        }
        comment.body = body;
        await comment.save();
        return res.json(comment);

    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});
router.get("/:id", async(req,res) =>{
    try{
        const id=req.params.id;
        const comment = await Comment.findOne({where:{id}});
        if (!comment){
            return res.status(404).json({err:"Comment not found"});
        }
        return res.json(comment);
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
router.delete("/:id", auth,async(req,res) =>{
    const id = req.params.id;
    try{
        const comment = await Comment.findOne({
            where: {id}, include: {model: User, as: 'user'}
        });
        if (!comment)
        {return res.status(404).json({err:"Comment not found"})};
        if(!checkPermissions(comment.user, req.user)) {
            return res.status(403).json({err:"Forbidden"});
        }
        await comment.destroy();
        return res.json({message: "Comment Deleted"});
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});
module.exports=router;