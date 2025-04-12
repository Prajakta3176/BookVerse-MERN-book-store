import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

export default function SignUp() {
const navigate = useNavigate();
const [values, setValues] = useState({
  username : "",
  email : "",
  password: "",
  address : "",
})

const handleChange =(e)=>{
  const {name,value} = e.target;

  setValues((prevValues) =>({
    ...prevValues, [name]:value
  }));
}

const handleSubmit = async()=>{
  try{
    if(!values.username || !values.email || !values.password || !values.address){
      return alert('All fields are required!');
  
    }else{
    
      
      // console.log("Sending data:", values);
      const res = await axios.post("http://localhost:8080/signup",values,{
        headers: { "Content-Type": "application/json" },
      });
      setValues({
        username : "",
        email : "",
        password: "",
        address : "",
      })
      // console.log("Signup Successful:", res.data);
      navigate('/login');
    }
  }catch(err){
    console.log(err.response.data.message);
    alert(err.response.data.message);
  }
}

// console.log(email);
// console.log(username);
  return (
    <div className='h-[85vh] sm:h-screen bg-zinc-900 p-10 flex items-center justify-center'>
        <div className='text-white w-[60vh] bg-zinc-800 rounded-2xl p-5'>
            <h1 className='text-3xl'>Sign Up</h1>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="username">Username</label>
            <input onChange={handleChange} className='bg-zinc-900 p-3 rounded' id='username' type="text" name='username' value={values.username} placeholder='username' required/>
            </div>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} className='bg-zinc-900 p-3 rounded' id='email' type="email" name='email' value={values.email} placeholder='xyz@example.com' required/>
            </div>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} className='bg-zinc-900 p-3 rounded' id='password' type="password" value={values.password} name='password' placeholder='password' required/>
            </div>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="address">Address</label>
            <textarea onChange={handleChange} className='bg-zinc-900 p-3 rounded' id='address' name='address' value={values.address}  placeholder='address' required/>
            </div>

            <button onClick={handleSubmit} className='font-semibold text-xl mt-4 bg-blue-500 rounded hover:rounded-4xl transition-all duration-300 px-5 py-3 w-full '>Sign up</button>
            <p className='mt-3 text-center'>Or</p>
            <p className='mt-3 text-center'>Already have an account? <Link className='text-blue-400 underline' to='/login'>Sign In</Link></p>
        </div>
    </div>
  )
}
