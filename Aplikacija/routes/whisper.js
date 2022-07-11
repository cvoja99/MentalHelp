const express = require('express');
const { body } = require('express-validator');
const {Whisper,User} = require('../models');
const router = express.Router();
const auth=require('../middleware/auth');
const { Op } = require('sequelize');
router.post("/",auth,    async(req,res) =>{
    const { targetUserId,body } = req.body;
    console.log(targetUserId)
    console.log(body);
    const  id  = req.user.id;
    console.log(req.body);
    try{
        const user = await User.findOne({
            where: {id}
        });
        if (!user)
        throw "User nije pronadjen";
        const targetuser=await User.findOne({
            where: {id:targetUserId}
        });
        if (!targetuser)
        throw "Target User nije pronadjen";
        const whispers = await Whisper.create({userId: user.id,targetuserId:targetuser.id,body});
        return res.json(whispers);
    }catch(err){
        console.log(err);
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
    const {targetuserId}=req.query;
    const id=req.user.id;
    try{
        if (!req.user.id)
        throw "User sa tim idem nije pronadjen";
        let whispers;
        console.log(req.query);
        if (targetuserId)
        {
             whispers = await Whisper.findAll({
                where: {
                    [Op.or]: [
                      { userId:id,targetuserId},
                      { userId:targetuserId,targetuserId:id }
                    ]
                  },
                limit:10,
                offset:0
            });
        }
        else
        {
            whispers= await Whisper.findAll({
                where:{id},
                limit:10,
                offset:0
            });
        }
        return res.json(whispers);
    
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
    });


module.exports=router;