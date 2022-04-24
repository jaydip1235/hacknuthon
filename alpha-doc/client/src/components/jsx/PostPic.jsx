import React from 'react';

const ProfilePic=({title})=>{
    return (
        <div className='text-center mb-4'>

            <h2 style={{color:'#091353', fontFamily: `'Special Elite', cursive`}}>{title}</h2>
        </div>
    );
};

export default ProfilePic;