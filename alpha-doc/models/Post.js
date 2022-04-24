const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    body:{
        type:String,
        required:true,
        minlength:10,
        maxlength:1000000
    },
    excerpt:{
        type:String,
        required:true
    },
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    }],
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
        required:true
    }
},
{timestamps:true})

const Post=new mongoose.model("postmodel",postSchema);

module.exports=Post;