const express = require('express');
const {PostVotes,CommentVotes} = require('../models');
const router = express.Router();
const auth=require('../middleware/auth');
router.post("/post",auth,async(req,res)=>{

    const postId=req.body.postId;
    try{
        const existingVote=await PostVotes.findOne({where:{postId,userId:req.user.id}});
        if (existingVote){
            await existingVote.destroy();
            return res.json({message: "Successfull downvote"});
        }
        let postVote=PostVotes.create({postId,userId:req.user.id});
        return res.json(postVote);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
})
router.post("/comment",auth,async(req,res)=>{

    const commentId=req.body.commentId;
    try{
        const existingVote=await CommentVotes.findOne({where:{commentId,userId:req.user.id}});
        if (existingVote){
            await existingVote.destroy();
            return res.json({message: "Successfull downvote"});
        }
        let commentVote=CommentVotes.create({commentId,userId:req.user.id});
        return res.json(commentVote);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
})
module.exports=router;