const express = require('express');
const { body } = require('express-validator');
const {Whisper,User} = require('../models');
const router = express.Router();
const auth=require('../middleware/auth');
router.post("/", async(req,res) =>{
    const { userId,targetuserId,body } = req.body;
    try{
        const user = await User.findOne({
            where: {id: userId}
        });
        if (!user)
        throw "User nije pronadjen";
        const targetuser=await User.findOne({
            where: {id:targetuserId}
        });
        if (!targetuser)
        throw "Target User nije pronadjen";
        const whispers = await Whisper.create({userId: user.id,targetuserId:targetuser.id,body});
        return res.json(whispers);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.delete("/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const whispers = await Whisper.findOne({
            where: {id}
        });
        await whispers.destroy();
        return res.json({message: "Whisper Deleted"});
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
router.get("/", auth,async(req,res) =>{
    const {targetuserId,offset}=req.body;
    const id=req.user.id;
    offset=req.body.offset;
    try{
        if (!req.user.id)
        throw "User sa tim idem nije pronadjen";
        let whispers;
        if (!targetuserId)
        {
             whispers = await Whisper.findAll({
                where:{id,targetuserId},
                limit:10,
                offset:{offset}||0
            });
        }
        else
        {
            whispers= await Whisper.findAll({
                where:{userId},
                limit:10,
                offset:{offset}||0
            });
        }
        return res.json(whispers);
    
    }catch(err){
        return res.status(500).json(err);
    }
    });


module.exports=router;