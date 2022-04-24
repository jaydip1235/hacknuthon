const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
const path=require('path');

require('./db/conn');

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));

app.use(cors());
app.use(morgan("dev"));

//User routes
app.use('/api/user',require('./routes/user.routes'));
//Category routes
app.use('/api/category',require('./routes/category.routes'));
//Post routes
app.use('/api/posts',require('./routes/post.routes'));

const port=process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "client/build", "index.html"));
      });
}

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})