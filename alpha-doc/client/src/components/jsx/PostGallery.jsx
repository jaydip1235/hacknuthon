import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OwnPostCard from './OwnPostCard';
import Loader from './Loader';

const PostGallery=()=>{
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(true);

    const fetchData=async()=>{
        try{
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("codeToken")}`
                }
            }
            const {data}=await axios.get('/api/user/getuser',config);
            let res=await axios.post(`/api/posts/getownposts`,{data},config);
            setLoading(false);
            setPosts(res.data);
            console.log(data);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div className='col-lg-12 col-md-12 col-sm-12 col-12' style={{backgroundColor: '#00b8f0',
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")'}}>
            <div className='post-gallery d-flex flex-column'>
                <h1 className='heading mb-0' style={{color:'white'}}>My docs</h1>

                <hr />

                <div className="post-grid d-flex flex-row flex-wrap justify-content-center cmt-gallery">
                    {
                        posts.length>0
                        ?
                        posts.map(((post,ind)=>{
                            return <OwnPostCard userid = {post.postedBy._id} key={post._id} title={post.title} body={post.excerpt} photo={post.photo?post.photo:"https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"} id={post._id}/>
                        }))
                        :
                        (loading?<Loader/>:<p>No post to show!</p>)
                    }
                </div>
            </div>
        </div>
    );
};

export default PostGallery;