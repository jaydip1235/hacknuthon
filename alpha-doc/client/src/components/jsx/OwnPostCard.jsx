import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';


const PostCard = ({title,body,photo,id,userid}) => {
    const [curruser,setCurruser]=useState('');
    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('codeToken')}`
            }
        };
        axios.get('/api/user/getuser',config)
        .then(res=>{
            console.log("dataId: "+res.data._id+" userid: "+userid)
            setCurruser(res.data._id);

        })
        .catch(err=>{
            console.log(err);
        })
    },[])


    const deletePost=async(id)=>{
        try {
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("codeToken")}`
                }
            }
            await axios.delete(`/api/posts/delete/${id}`,config);
            alert("Post deleted!");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const navigate=useNavigate();

    return (
        <Card sx={{ display: 'flex', height:'150px' }} className='post-card my-2 mx-3 cmt-card' style={{backgroundColor: '#BEAEE2'}}>

            <CardMedia
                component="img"
                sx={{ maxWidth: 150 }}
                image={photo}
                className='post-card-img'
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <CardContent>

                    <Typography className='profile-details' gutterBottom variant="h6" component="div">
                        {parse(title)}
                    </Typography>
{/*                                 
                    <Typography variant="body2" color="text.secondary">
                        {parse(body)}
                    </Typography> */}

                </CardContent>

                <CardActions className='d-flex justify-content-end'>
                    <Button size="small" onClick={
                        ()=>{
                            navigate(`/post/${id}`)
                        }
                    }>View</Button>
                    {
                        curruser===userid? 
                    <>
                         <Button size="small"
                    onClick={
                        ()=>{
                            navigate(`/editpost/${id}`);
                        }
                    }
                    >Edit</Button>
                    <Button size="small"
                    onClick={
                        ()=>{
                            deletePost(id);
                        }
                    }
                    >Delete</Button>
                    </>:null}
                   
                </CardActions>
            </Box>
        
        </Card>
    );
};

export default PostCard;