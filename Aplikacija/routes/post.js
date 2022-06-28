const express = require('express');
const {Post,User,Comment, Sequelize} = require('../models');
const router = express.Router();
const auth=require('../middleware/auth');
const checkPermissions = require('../utils/helpers');
router.delete("/:id", auth,async(req,res) =>{
    const id = req.user.id;
    try{
        const post = await Post.findOne({
            where: {id}
        });
        if(!post){
            return res.status(404).json({err:"Post not found"});
        }
        if(!checkPermissions(post.user, req.user)) {
            return res.status(403).json({err:"Forbidden"});
        }
        await post.destroy();
        return res.json({message: "Post Deleted"});
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
router.post("/",auth, async(req,res) =>{
    const { title,body,description,image} = req.body
    try{
        const user = await User.findOne({
            where: {id: req.user.id}
        });
        if (!user)
        throw "User nije pronadjen";
        const post = await Post.create({title,body,description,image, userId: user.id });
        return res.json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.get("/", auth,async(req,res) =>{
    try{
        const id=req.body.id;
        const offset=req.body.offset;
        const posts = await Post.findAll({
            where:{userId:id},
            limit:10,
            offset:0,
            include: {model: Comment, as: 'commentId'},
            attributes:{
                include: [
                [Sequelize.literal("(SELECT COUNT(*) FROM PostVotes where PostVotes.postId=Post.id)"), "votes"]
            ]
            },  
        });
        return res.json(posts);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.get("/:id", async(req,res) =>{
    try{
        const id=req.params.id;
        const post = await Post.findOne({
            where:{userId:id},
            limit:10,
            offset:0,
            include: {model: Comment, as: 'commentId'},
            attributes:{
                include: [
                [Sequelize.literal("(SELECT COUNT(*) FROM PostVotes where PostVotes.postId=Post.id)"), "votes"]
            ]
            },  
        });
        return res.json(post);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});
router.put("/:id", auth,async(req,res) =>{
    const id = req.user.id;
    const { title, body, description,image} = req.body;
    try{
        const post = await Post.findOne({
            where: {id}
        });
        if(!post){
            return res.status(404).json({err:"Post not found"});
        }
        post.title = title;
        post.body = body;
        post.description = description;
        post.image=image;

        await post.save();
        return res.json(post);

    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
module.exports=router;