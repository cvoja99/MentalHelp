const express = require('express');
const {Comment,User,Post} = require('../models');
const router = express.Router();
const auth=require('../middleware/auth');
router.post("/post",auth,async(req,res)=>{

    const postId=req.body.postId;
    try{
        const User=await User.findOne({where:{id:req.user.id}})
        const existingVote=await postVotes.findOne({where:{postId,userId:req.user.id}});
        if (existingVote){
            await existingVote.destroy();
            return res.json({message: "Successfull downvote"});
        }
        postVotes.create({postId,userId:req.user.id});
        return res.json(postVotes);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
})
router.post("/comment",auth,async(req,res)=>{

    const commentId=req.body.commentId;
    try{
        const User=await User.findOne({where:{id:req.user.id}})
        const existingVote=await commentVotes.findOne({where:{commentId,userId:req.user.id}});
        if (existingVote){
            await existingVote.destroy();
            return res.json({message: "Successfull downvote"});
        }
        commentVotes.create({commentId,userId:req.user.id});
        return res.json(commentVotes);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
})