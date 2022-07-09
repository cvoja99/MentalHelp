const express = require('express');
const {Post,User,Comment, Sequelize, PostVotes} = require('../models');
const router = express.Router();
const auth=require('../middleware/auth');
const checkPermissions = require('../utils/helpers');
router.delete("/:id", auth,async(req,res) =>{
    const { id } = req.params;
    console.log(req.params);
    try{
        const post = await Post.findOne({
            where: {id},
            include: {model: User, as: 'user'}
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
        console.log(err);
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
        console.log(err);
        return res.status(500).json(err);
    }
});
router.get("/",async(req,res) =>{
    try{
        const offset=req.body.offset;
        const posts = await Post.findAll({
            limit:10,
            offset:0,
            include: [{model: Comment, as: 'comments'}, {model: User, as:'user'}],
            attributes:{
                include: [
                [Sequelize.literal("(SELECT COUNT(*) FROM PostVotes where PostVotes.postId=Post.id)"), "votes"]
            ]
            },  
        });
        console.log(posts);
        return res.json(posts);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.get("/:id", async(req,res) =>{
    try{
        const id=req.params.id;
        const post = await Post.findOne({
            where:{id},
            limit:10,
            offset:0,
            include: [{model: Comment, as: 'comments', include: { model: User, as: 'user'}}, { model: User, as: 'user'}],
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
    const { title, body, description,image} = req.body;
    const { id } = req.params;
    try{
        const post = await Post.findOne({
            where: {id},
            include: {model: User, as: 'user'}
        });
        if(!checkPermissions(post.user, req.user)) {
            return res.status(403).json({err:"Forbidden"});
        }
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
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});
module.exports=router;