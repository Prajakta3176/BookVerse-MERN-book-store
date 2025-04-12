import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { authActions } from '../../store/auth';

export default function MobileNav() {
  const role = useSelector((state) => state.auth.role);
   const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
   console.log(role,isLoggedIn);
  

    return (
      <div className='w-full flex items-center justify-center pb-2 rounded px-4 my-2 bg-zinc-800 lg:hidden'>
        {
           role === 'user' &&  isLoggedIn && (
            <>
              <Link to='/profile' className='text-zinc-100 font-semibold w-full py-2 px-1 sm:px-2 mt-4 text-center bg-zinc-800 hover:bg-zinc-900 rounded transition-all duration-300'>Favorites</Link>
              <Link to='/profile/order-history' className='text-zinc-100 font-semibold w-full py-2 px-1 sm:px-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300 whitespace-nowrap'>Order History</Link>
              <Link to='/profile/settings' className='text-zinc-100 font-semibold w-full py-2 px-1 sm:px-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Settings</Link>
            </>
          )
        }
        {
          role === 'admin' && isLoggedIn &&   (
            <>
              <Link to='/profile' className='text-zinc-100 font-semibold w-full py-2 px-1 sm:px-2 mt-4 text-center bg-zinc-800 hover:bg-zinc-900 rounded transition-all duration-300'>All Orders</Link>
              <Link to='/profile/add-book' className='text-zinc-100 font-semibold w-full py-2 px-1 sm:px-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300 whitespace-nowrap'>Add Book</Link>
              <Link to='/profile/settings' className='text-zinc-100 font-semibold w-full py-2 px-1 sm:px-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Settings</Link>
            </>
          )
        }
      </div>
    );
  }

