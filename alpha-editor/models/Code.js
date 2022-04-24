const mongoose=require('mongoose');

const codeSchema=new mongoose.Schema({
    username:{
        type:String
    },
    code:{
        type:String,
        default:`print("Welcome to Arjditor!")`
    },
    extension:{
        type:String,
        default:"py"
    },
    language:{
        type:String,
        default:"python"
    },
    socketId:{
        type:String
    }
})

const Code=new mongoose.model("code",codeSchema);
module.exports=Code;