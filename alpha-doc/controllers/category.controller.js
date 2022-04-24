const express=require('express');
const Category=require('../models/Category');
const slugify=require('slugify');

//Add category
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.addCategory=async(req,res)=>{
    try {
        const {categoryname}=req.body;
        const slug=await slugify(categoryname).toLowerCase();
        const category=new Category({categoryname,slug});
        await category.save();
        res.status(201).json({message:"Category added!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}