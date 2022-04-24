import React, { useState,useEffect } from 'react';
import axios from 'axios';
import axiosConfig from 'axios-config';
import {useNavigate} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

const Register = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("codeToken")) navigate('/');
    })
    const [fullName,setfullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");

    /**
     * 
     * @param {import('react').FormEvent} e 
     */
    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();
            if(!fullName.trim() || !email.trim() || !password.trim() || !cpassword.trim()) alert("Don't leave any field empty!");
            else if(password!==cpassword) alert("Passwords didn't match!");
            else{
                const config=axiosConfig();
                console.log(config);
                const {data}=await axios.post('/api/user/join',{fullName,email,password},config);
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
    <div style={{paddingBottom:50,backgroundColor: '#9A616D'}}>
    <section class="vh-100">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style={{borderRadius: 25,backgroundColor: '#EDD2F3'}}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
    
                    <form class="mx-1 mx-md-4"
                    onSubmit={handleSubmit}
                    >
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                         <div class="md-form flex-fill mb-0">
                          <input type="text" id="form3Example1c" class="form-control" placeholder='Your Name' value={fullName} onChange={(e)=>setfullName(e.target.value)}/>
                        </div>
                      </div>
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="md-form flex-fill mb-0">
                          <input type="email" id="form3Example3c" class="form-control" placeholder='Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                      </div>
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="md-form flex-fill mb-0">
                          <input type="password" id="form3Example4c" class="form-control" value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                      </div>
    
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="md-form flex-fill mb-0">
                          <input type="password" id="form3Example4cd" class="form-control" value={cpassword} placeholder='Re-enter your Password' onChange={(e)=>setCpassword(e.target.value)} />
                        </div>
                      </div>
    
                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" class="btn btn-primary btn-lg">Register</button>
                      </div>
    
                    </form>
    
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
    
                    <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" class="img-fluid" alt="Sample image"/>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
            </div>
  )
}

export default Register