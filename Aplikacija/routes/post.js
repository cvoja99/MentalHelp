const express = require('express');
const {Post,User} = require('../models');
const router = express.Router();

router.delete("/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const post = await Post.findOne({
            where: {id}
        });
        await post.destroy();
        return res.json({message: "Post Deleted"});
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
router.post("/", async(req,res) =>{
    const { title,body,description,image, userId} = req.body
    try{
        const user = await User.findOne({
            where: {id: userId}
        });
        if (!user)
        throw "User nije pronadjen";
        const post = await Post.create({title,body,description,image, userId: user.id });
        return res.json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.get("/", async(req,res) =>{
    try{
        const id=req.body.id;
        const offset=req.body.offset;
        const posts = await Post.findAll({
            where:{userId:id},
            limit:10,
            offset:{offset}||0

        });
        return res.json(posts);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.put("/:id", async(req,res) =>{
    const id = req.params.id;
    const { title, body, description,image} = req.body;
    try{
        const post = await Post.findOne({
            where: {id}
        });
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