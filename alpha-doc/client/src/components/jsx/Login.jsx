import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosConfig from 'axios-config';
import {useNavigate,NavLink} from 'react-router-dom';

const Login = () => {

    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("codeToken")) navigate('/');
    })
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    /**
     * 
     * @param {import('react').FormEvent} e 
     */
    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();
            if(!email.trim() || !password.trim()) alert("Don't leave any field empty!");
            else{
                const config=axiosConfig();
                console.log(config);
                const {data}=await axios.post('/api/user/join',{email,password},config);
                console.log(data);
                localStorage.setItem("codeToken",data);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
        }
    }

  return (
    <>
        <div style={{paddingBottom:50,backgroundColor: '#9A616D'}}>
<section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style={{borderRadius: '1rem'}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="login form"
                class="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}}
              />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form onSubmit={handleSubmit}>

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                    <span class="h1 fw-bold mb-0">Login</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Sign into your account</h5>

                  <div class="md-form mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </div>

                  <div class="md-form mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-lg btn-block" type="submit" style={{backgroundColor:'#9A616D'}}>Login</button>
                  </div>

                  <p class="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <NavLink exact to='/register' style={{color: '#393f81'}}>Register here</NavLink></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
    </>
  )
}

export default Login