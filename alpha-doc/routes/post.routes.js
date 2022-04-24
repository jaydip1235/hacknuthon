const router=require('express')();
const {protectUser}=require('../middlewares/protect');
const {createPost,getPost,updatePost,deletePost,getAllPosts,getRelatedPosts,getOwnPosts}=require('../controllers/post.controller');

//Create post
router.post('/create',protectUser,createPost);

//Get a post
router.get('/:postid',protectUser,getPost);

//Update a post
router.put('/:postid',protectUser,updatePost);

//Get all posts according to categories
router.post('/allwithcategories',protectUser,getAllPosts);

//Get all related posts
router.get('/related/:postid',protectUser,getRelatedPosts);

//Delete a post
router.delete('/delete/:postid',protectUser,deletePost);

//Get own posts
router.post('/getownposts',protectUser,getOwnPosts);

module.exports=router;