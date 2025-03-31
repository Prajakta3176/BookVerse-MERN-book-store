import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'


export default function SignUp() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [username, setUsername] = useState("")
const [address, setAddress] = useState("")

// console.log(email);
// console.log(username);
  return (
    <div className='h-[85vh] sm:h-screen bg-zinc-900 p-10 flex items-center justify-center'>
        <div className='text-white w-[60vh] bg-zinc-800 rounded-2xl p-5'>
            <h1 className='text-3xl'>Sign Up</h1>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="username">Username</label>
            <input onChange={(e)=>setUsername(e.target.value)} className='bg-zinc-900 p-3 rounded' id='username' type="text" name='username' value={username} placeholder='username' required/>
            </div>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="email">Email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} className='bg-zinc-900 p-3 rounded' id='email' type="email" name='email' value={email} placeholder='xyz@example.com' required/>
            </div>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="password">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} className='bg-zinc-900 p-3 rounded' id='password' type="password" value={password} name='password' placeholder='password' required/>
            </div>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="address">Address</label>
            <textarea onChange={(e)=>setAddress(e.target.value)} className='bg-zinc-900 p-3 rounded' id='address' name='address' value={address}  placeholder='address' required/>
            </div>

            <button className='font-semibold text-xl mt-4 bg-blue-500 rounded hover:rounded-4xl transition-all duration-300 px-5 py-3 w-full '>Sign up</button>
            <p className='mt-3 text-center'>Or</p>
            <p className='mt-3 text-center'>Already have an account? <Link className='text-blue-400 underline' to='/login'>Sign In</Link></p>
        </div>
    </div>
  )
}
