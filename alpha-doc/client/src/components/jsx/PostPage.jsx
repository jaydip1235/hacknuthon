import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostData from './PostData';
import '../css/postPage.css';
import PostCarousal from './PostCarousal.jsx';
import { useParams,useNavigate } from 'react-router-dom';

const PostPage=()=>{
    const navigate = useNavigate();
    const {_id}=useParams();
    const [post,setPost]=useState("");

    const getPost=async()=>{
        try {
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("codeToken")}`
                }
            }
            const {data}=await axios.get(`/api/posts/${_id}`,config);
            setPost(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(!localStorage.getItem("codeToken")){
            navigate("/login");
          }
        getPost();
    },[])

    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            if(elapsed/1000 < 30) return "Just now";
            
            return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }

    return (
        <>
        <div style={{paddingTop:80, paddingBottom:120, backgroundColor: '#E7D9EA',
backgroundImage: `url("https://www.transparenttextures.com/patterns/shattered-dark.png")`}}>
            <div className='container d-flex'>

                <div className="row" style={{width:'100%'}}>
                    <PostData postedBy={post?post.postedBy.fullName:null} createdAt={post?timeDifference(new Date(),new Date(post.createdAt)):null} body={post?post.body:null} title={post?post.title:null} />
                </div>
            </div>

            <PostCarousal postid={post?post._id:null} />
            </div>
        </>
    );
};

export default PostPage;