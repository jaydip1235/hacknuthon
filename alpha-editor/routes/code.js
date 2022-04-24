const router=require('express').Router();
const {uploadCode,getCode,createRoom}=require('../controllers/code');

router.post('/uploadcode',uploadCode);

router.get('/getcode/:codeId',getCode);

router.post('/createroom',createRoom);

module.exports=router;