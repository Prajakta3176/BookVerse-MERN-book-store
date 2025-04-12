import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../loader/Loader';


export default function Settings() {

  const [values, setValues] = useState({address : ""});
  const [profileData , setProfileData] = useState();


  const headers = {
    id : localStorage.getItem('id'),
    authorization : `Bearer ${localStorage.getItem('token')}`
  }
  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get('http://localhost:8080/user-information',{headers})
      setProfileData(res?.data);
      setValues({address : res?.data?.address})
    }
    fetch();
  },[])

  const handleChange = (e)=>{
      setValues({
        address : e.target.value
      })

      // console.log(values);
  }

  const handleUpdate = async()=>{
    const res = await axios.patch('http://localhost:8080/update-address',values,{headers});
    alert(res.data.message)
    // console.log(res.data);
  }

  return (
    <>
      {
        !profileData && (
          <div className='w-full h-[100%] flex items-center justify-center'>
            <Loader/>
          </div>
        )
      }
      {
        profileData && (
          <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>

            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-8'>
                    <div>
                      <label htmlFor="username">Username</label>
                      <p className='p-3 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.username}</p>
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <p className='p-3 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.email}</p>
                    </div>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="address">Address</label>
                  <textarea onChange={(e)=>{handleChange(e)}} className='p-2 rounded bg-zinc-800 mt-2 font-semibold  ' rows="5" placeholder='Address' name='address' value={values.address}></textarea>
                </div>

                <div className='flex justify-end'>
                 <button onClick={handleUpdate} className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-300 transition-all duration-300'>Update</button>
                </div>
            </div>
          </div>
        )
      }
    </>
  )
}
