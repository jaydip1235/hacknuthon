const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    categoryname:{
        type:String,
        trim:true
    },
    slug:{
        type:String
    }
},
{timestamps:true})

const Category=new mongoose.model("category",categorySchema);

module.exports=Category;