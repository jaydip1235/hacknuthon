import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import PostCard from './PostCard';

const PostCarousal=()=>{

    const {_id}=useParams();
    const [posts,setPosts]=useState([]);



    useEffect(()=>{
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("codeToken")}`
            }
        }
        axios.get(`/api/posts/related/${_id}`,config).then((data)=>{
            setPosts(data.data);
            console.log(data.data);
        }).catch((error)=>console.log(error));
    },[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,

        // responsive: [{
        //     breakpoint: 993,
        //     settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2,
        //     }},
        //     {
        //     breakpoint: 768,
        //     settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //     }},
        // ]
    };

    return (
        <div style={{marginTop:'100px'}}>
            <h3 className="heading mt-5" style={{color:'#A2416B',fontWeight:'bold'}}>Related Posts</h3>
            <Slider {...settings}>
                {
                    posts.length>0
                    ?
                    posts.map((post)=>{
                        return <div><PostCard title={post.title} body={post.excerpt} id={post._id} /></div>
                    })
                    :
                    null
                }
            </Slider>
        </div>
    );
};

export default PostCarousal;