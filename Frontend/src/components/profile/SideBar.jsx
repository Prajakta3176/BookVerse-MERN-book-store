import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
export default function SideBar({data}) {
    const backendURL = "http://localhost:8080";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role)
       const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    
  
    // console.log(data);
    const handleLogout = ()=>{
        alert("Are you sure you want to logout? ");
        dispatch(authActions.logout());
        dispatch(authActions.changeRole('user'))
        localStorage.clear('id' )
        localStorage.clear('token')
        localStorage.clear('role')
        navigate('/')
        }

  return (
    <div className='bg-zinc-800 px-4 py-6 rounded flex flex-col items-center justify-between   lg:h-[75vh]'>
        <div className='flex flex-col items-center  justify-center'>
        <img src={`${backendURL}${data?.avatar}`} className='w-[50px]'  alt="avatar" />
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data?.username}</p>
        <p className='mt-1 text-normal text-zinc-300'>{data?.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>

        </div>
    
        <div className='w-full flex-col items-center justify-center hidden h-auto lg:flex my-15'>
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
    
    <button onClick={handleLogout} className='bg-zinc-900 w-full lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-4 rounded-xl hover:bg-zinc-600 '>
        Log Out <FaArrowRightFromBracket className='ms-4'/>
    </button>
    </div>
  )
}
