import React from 'react';
import PostProfileCard from './PostProfileCard';
import PostPic from './PostPic';

const PostData=({postedBy,createdAt,body,title})=>{

    

    return (
        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
            <div className='d-flex flex-column'>
                <PostPic title={title?title:null} />

                <PostProfileCard
                    postedBy={postedBy?postedBy:null}
                    time={createdAt?createdAt:null}
                    body={body?body:null}
                 />
            </div>
        </div>
    );
};

export default PostData;