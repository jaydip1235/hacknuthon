const express=require('express');
const Post = require('../models/Post');

//Create post
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.createPost = async (req, res) => {
    try {
        const { title, body, categories } = req.body;
        if (!title.trim() || !body.trim() || categories.length == 0) {
            res.status(400).json({ error: "Don't leave any field empty!" });
        }
        else {
            const postedBy = req.user._id;
            const excerpt = body.length > 30 ? `${body.slice(0, 30)}...` : body;
            const post = new Post({ title, body, excerpt, categories, postedBy });
            await post.save();
            res.status(201).json({ message: "Post created!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get a post
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getPost = async (req, res) => {
    try {
        const _id = req.params.postid;
        const post = await Post.findOne({ _id }).populate("categories").populate("postedBy");
        if (!post) res.status(400).json({ error: "Post doesn't exist!" });
        else res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Updte a post
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.updatePost = async (req, res) => {
    try {
        const _id = req.params.postid;
        const { title, body, categories } = req.body;
        const post = await Post.findOne({ _id });
        if (post.postedBy.toString().trim() == req.user._id.toString().trim()) {
            if (!title.trim() || !body.trim() || categories.length == 0) {
                res.status(400).json({ error: "Don't leave any field empty!" });
            }
            else {
                const excerpt = body.length > 100 ? `${body.slice(0, 100)}...` : body;
                await Post.updateOne({ _id },
                    {
                        $set: { title, body, excerpt, categories }
                    });
                res.status(201).json({ message: "Post updated!" });
            }
        }
        else {
            res.status(400).json({ error: "Only admin can update profile!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get all posts according to categories
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getAllPosts = async (req, res) => {
    try {
        const sk = req.body.sk ? parseInt(req.body.sk) : 0;
        const lt = req.body.lt ? parseInt(req.body.lt) : 6;
        const posts = await Post.find({
            categories: { $in: req.body.categories }
        }).sort({createdAt:-1}).populate("categories").populate("postedBy");
        const cntPosts = await Post.find({
            categories: { $in: req.body.categories }
        });
        res.status(200).send({ posts, size: cntPosts.length });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get all related posts
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getRelatedPosts = async (req, res) => {
    try {
        const _id = req.params.postid;
        const post = await Post.findOne({ _id });
        const categories = post.catagories;
        console.log(post.categories);
        const posts = await Post.find({ _id: { $ne: _id }, categories: { $in: post.categories } }).populate("categories").populate("postedBy");
        if (!posts || posts.length == 0) res.status(400).json({ error: "No post found!" });
        else res.status(200).send(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Delete a post
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.deletePost = async (req, res) => {
    try {
        const _id = req.params.postid;
        const post = await Post.findOne({ _id });
        if (!post) {
            res.status(400).json({ error: "Post not found!" });
        }
        else if (post.postedBy.toString().trim() == req.user._id.toString().trim()) {
            await Post.deleteOne({ _id });
            res.status(200).json({ message: "Post deleted!" });
        }
        else {
            res.status(400).json({ error: "Only admin can update profile!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get own posts
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getOwnPosts=async(req,res)=>{
    console.log("Random");
    try {
        const posts=await Post.find({postedBy:req.user._id}).populate("postedBy");
        res.status(200).send(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}