import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

export default function Login() {
const navigate = useNavigate();
const dispatch = useDispatch();
const [values, setValues] = useState({
  username : "",
  password: "",
})

const handleChange =(e)=>{
  const {name,value} = e.target;

  setValues((prevValues)=>({
    ...prevValues, [name]:value
  }));
}

const handleSubmit = async()=>{
  try{
    if(!values.username || !values.password ){
      return alert('Please enter valid Credential');
  
    }else{ 
      // console.log("Sending data:", values);
       const res = await axios.post("http://localhost:8080/signin",values,{
        headers: { "Content-Type": "application/json" },
      });
      navigate('/profile');

      console.log(res.data);
      dispatch(authActions.login())
      dispatch(authActions.changeRole(res?.data?.role))
      localStorage.setItem('id' , res?.data?.id)
      localStorage.setItem('token' , res?.data?.token)
      localStorage.setItem('role' , res?.data?.role)
      console.log("Signin Successful");
      alert("SignIn successful")

      setValues({
        username : "",       
        password: "",       
      })
    }
  }catch(err){    
    console.log(err);
    alert(err?.response?.data?.message);
  }
}

  return (
    <div className='h-[85vh] sm:h-screen bg-zinc-900 p-5 md:p-10 flex items-center justify-center'>
        <div className='text-white w-[60vh] bg-zinc-800 rounded-2xl p-5'>
            <h1 className='text-3xl'>Sign In</h1>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="username">Username</label>
            <input onChange={handleChange} className='bg-zinc-900 p-3 rounded' id='username' type="text" name='username' value={values.username} placeholder='username' required/>
            </div>
            
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} className='bg-zinc-900 p-3 rounded' id='password' type="password" value={values.password} name='password' placeholder='password' required/>
            </div>

            <button onClick={handleSubmit} className='font-semibold text-xl mt-4 bg-blue-500 rounded hover:rounded-4xl transition-all duration-300 px-5 py-3 w-full '>Sign In</button>
            <p className='mt-3 text-center'>Or</p>
            <p className='mt-3 text-center'>Create new Account <Link className='text-blue-400 underline' to='/sign-up'>Sign up</Link></p>
        </div>
    </div>
  )
}
