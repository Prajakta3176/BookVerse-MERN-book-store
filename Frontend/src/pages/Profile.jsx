import React, { useEffect, useState } from 'react'
import SideBar from '../components/profile/SideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';
import Loader from '../components/loader/Loader';
import MobileNav from '../components/profile/MobileNav';

export default function Profile() {
  // const isLoggedIn = useSelector(state => state.auth);
  const [profile, setProfile] = useState()
  const headers = {
    id:localStorage.getItem('id'),
    authorization : `Bearer ${localStorage.getItem('token')}`

  }
  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get('http://localhost:8080/user-information',{headers});
      setProfile(res.data);
      // console.log(res.data);
    }
    fetch();
  },[])
  return (
    <div className='bg-zinc-900 min-h-screen py-8 px-2 md:px-10 flex flex-col lg:flex-row  gap-4 text-white'>
        {
          Profile ? <>
          <div className='w-full  lg:w-1/6'>
            <SideBar data={profile}/>
            <MobileNav/>
          </div>
          <div className='w-full lg:w-5/6'>
            <Outlet/>
          </div>
          </>  : <div className='w-full flex items-center justify-center'>
                  <Loader/>
             </div>
        }
    </div>
  )
}
