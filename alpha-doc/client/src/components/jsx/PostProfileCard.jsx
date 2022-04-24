import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Fab from '@mui/material/Fab';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const PostProfileCard=({postedBy,time,like,body})=>{

    const {_id}=useParams();

      const [copied, setCopied] = useState(false);

      const copy=()=>{
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
      }

    return (

        <div className='mx-auto' >
            <Card className='comment-page-card-data' style={{backgroundColor:'#D7E9F7'}}>
            
                <CardContent>
                    
                    <Typography variant="body2" color="text.secondary" style={{fontWeight:'bold'}}>

                        <div className='d-flex flex-row justify-content-between'>
                        <div><PersonIcon className='author-icon u-ico'/> {postedBy}</div>
                            <div><AccessTimeIcon className='author-icon u-ico' /> {time}</div>
                        </div>

                        <br />

                         <>
                            {body?parse(body):null}
                        </>
                        
                    </Typography>

                    <br />


                </CardContent>

                <CardActions className='profile-options'>
                    
                    <div>
                        <Button size="small"onClick={copy}>{!copied ? "Share" : "Copied!"}</Button>
                    </div>
                    
                </CardActions>
            </Card>

        </div>
    );
};

export default PostProfileCard;