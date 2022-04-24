const router=require('express').Router();
const {addCategory}=require('../controllers/category.controller');

//Add a category
router.post('/addcategory',addCategory);

module.exports=router;