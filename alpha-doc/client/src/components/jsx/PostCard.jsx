import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';


const PostCard = ({title,body,id}) => {

    const navigate=useNavigate();

    return (
        <Card sx={{ display: 'flex', height:'150px' }} className='post-card my-2 mx-3' style={{backgroundColor: '#FFC4E1'}}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <CardContent>

                    <Typography className='profile-details' gutterBottom variant="h5" component="div">
                        {parse(title)}
                    </Typography>
                                
                    <Typography variant="body2" color="text.secondary">
                        {parse(body)}
                    </Typography>

                </CardContent>

                <CardActions className='d-flex justify-content-end'>
                    <Button size="small"
                    onClick={
                        ()=>{
                            navigate(`/post/${id}`);
                            window.location.reload();
                        }
                    }
                    >View</Button>
                </CardActions>
            </Box>
        
        </Card>
    );
};

export default PostCard;