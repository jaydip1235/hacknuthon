const router=require('express').Router();
const {join,getOwnDetails}=require('../controllers/user.controllers');
const {protectUser}=require('../middlewares/protect');

//Join
router.post('/join',join);

//Get own details
router.get('/getuser',protectUser,getOwnDetails);

module.exports=router;