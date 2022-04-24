const express=require('express');
const User=require('../models/User');

//Join
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.join=async(req,res)=>{
    try {
        const {fullName,email,password}=req.body;
        let user=await User.findOne({email});
        let token;
        if(user){
            const matched=await user.comparePasswords(password);
            if(matched){
                token=await user.generateToken();
                res.status(200).send(token);
            }
            else res.status(400).json({error:"Passwords didn't match!"})
        }
        else{
            if(!fullName.trim() || !email.trim() || !password.trim()){
                res.status(400).json({error:"Can't create user!"});
            }
            else{
                user=new User({fullName,email,password});
                await user.save();
                token=await user.generateToken();
                res.status(201).send(token);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrrong!"});
    }
}

//Get details
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getOwnDetails=async(req,res)=>{
    try {
        res.status(200).send(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrrong!"});
    }
}

