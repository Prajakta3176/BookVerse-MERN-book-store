import React, { useState } from 'react'
import { Link } from 'react-router'

export default function Login() {
const [password, setPassword] = useState("")
const [username, setUsername] = useState("")

  return (
    <div className='h-[85vh] sm:h-screen bg-zinc-900 p-5 md:p-10 flex items-center justify-center'>
        <div className='text-white w-[60vh] bg-zinc-800 rounded-2xl p-5'>
            <h1 className='text-3xl'>Sign In</h1>
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="username">Username</label>
            <input onChange={(e)=>setUsername(e.target.value)} className='bg-zinc-900 p-3 rounded' id='username' type="text" name='username' value={username} placeholder='username' required/>
            </div>
            
            <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="password">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} className='bg-zinc-900 p-3 rounded' id='password' type="password" value={password} name='password' placeholder='password' required/>
            </div>

            <button className='font-semibold text-xl mt-4 bg-blue-500 rounded hover:rounded-4xl transition-all duration-300 px-5 py-3 w-full '>Sign In</button>
            <p className='mt-3 text-center'>Or</p>
            <p className='mt-3 text-center'>Create new Account <Link className='text-blue-400 underline' to='/sign-up'>Sign up</Link></p>
        </div>
    </div>
  )
}
