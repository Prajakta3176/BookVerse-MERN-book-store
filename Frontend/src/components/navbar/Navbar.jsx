import React, { useEffect, useState } from 'react'
import logo from '../../assets/book.png'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
// import { FaGripLines } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { authActions } from '../../store/auth';
export default function Navbar() {
 const [isMobile, setIsMobile] = useState(window.innerWidth <=  767);
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
const dispatch = useDispatch();
const role = useSelector((state) => state.auth.role)
// console.log(role);
// console.log(isLoggedIn);


//  isLoggedIn = true;
  useEffect(()=>{
   const handleResize=()=>{
      setIsMobile(window.innerWidth <=  767)
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[isMobile])

  const handleMenu = ()=>{
    if(isMenuOpen){
      setIsMenuOpen(false);
    } else{
      setIsMenuOpen(true);
    }
  }

  const handleLogout = ()=>{
    alert("Are you sure you want to logout? ");
    dispatch(authActions.logout());
    localStorage.removeItem('id' )
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    }

  return (
    <>
    <nav className='z-50 relative h-[10vh] md:h-[15vh] overflow-x-hidden bg-zinc-800 text-white px-4 py-4 w-full flex justify-between items-center '>
        <div  className='flex items-center gap-3'>
            <img className='w-10' src={logo} alt="logo" />
            <Link to='/' className='text-2xl font-semibold'>BookVerse</Link>
        </div>
        <div className='block md:flex gap-4 items-center'>
            <div className='hidden md:flex gap-6 text-xl'>
                <Link className='hover:text-blue-500 transition-all duration-300' to='/'>Home</Link>
                <Link className='hover:text-blue-500 transition-all duration-300' to='/all-books'>All Books</Link>
                <Link className={`${!isLoggedIn || role === 'admin' ? 'hidden' :"" }  hover:text-blue-500 transition-all duration-300`} to='/cart'>Cart</Link>
                <Link  to='/profile' className={`${(isLoggedIn === true) && (role === "user") ? 'block' : 'hidden'} hover:text-blue-500 transition-all duration-300`}>Profile</Link>         
                <Link  to='/profile' className={`${(isLoggedIn === true) && (role === "admin") ? 'block' : 'hidden'} hover:text-blue-500 transition-all duration-300`}>Admin Profile</Link>         
            </div>
            <div className={`${isLoggedIn ? "md:hidden" : "md:flex" } hidden gap-4`}>
                <Link to='/login' className='text-xl px-4 py-2 border border-blue-500 border-2 rounded hover:text-black hover:bg-white transition-all duration-300'>Login</Link>
                <Link to='/sign-up' className='text-xl px-4 py-2 border border-blue-500 rounded bg-blue-500 hover:text-black hover:bg-white transition-all duration-300'>SignUp</Link>
            </div>
            <div className={`${isLoggedIn ? "md:flex" : "md:hidden" } hidden gap-4`}>
                <Link onClick={handleLogout} to='/login' className='text-xl px-4 py-2 border border-blue-500 border-2 rounded hover:text-black hover:bg-white transition-all duration-300'>Logout</Link>         
            </div>

            <button onClick={handleMenu} className={`${isMobile ? "block"  : 'hidden'}  text-2xl hover:text-zinc-300 transition-all duration-300`}>
            <TiThMenu />
            </button>

        </div>
    </nav>
    <div className={` ${isMenuOpen ? "flex"  : 'hidden'} text-white text-3xl font-semibold  bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex-col items-center justify-center`}>
                <Link onClick={handleMenu} className=' mb-8 hover:text-blue-500 transition-all duration-300' to='/'>Home</Link>
                <Link onClick={handleMenu} className=' mb-8 hover:text-blue-500 transition-all duration-300' to='/all-books'>All Books</Link>
                <Link onClick={handleMenu} className={`${!isLoggedIn || role === 'admin' ? 'hidden' :"" } mb-8 hover:text-blue-500 transition-all duration-300`} to='/cart'>Cart</Link>
                <Link onClick={handleMenu} to='/login' className={`${isLoggedIn ? "hidden" : "block" } mb-8 text-3xl font-semibold px-5 py-3  border-blue-500 border-2 rounded hover:text-black hover:bg-white transition-all duration-300`}>Login</Link>
                <Link onClick={handleMenu} to='/sign-up' className={`${isLoggedIn ? "hidden" : "block" } mb-8 text-3xl font-semibold px-5 py-3 border border-blue-500 rounded bg-blue-500 hover:text-black hover:bg-white transition-all duration-300`}>SignUp</Link>
                <Link  to='/profile' className={` ${(isLoggedIn === true) && (role === "admin") ? 'block' : 'hidden'} mb-8 text-xl px-4 py-2  border-blue-500 border-2 rounded hover:text-black hover:bg-white transition-all duration-300`}>Admin Profile</Link>         
                <Link  to='/profile' className={` ${(isLoggedIn === true) && (role === "user") ? 'block' : 'hidden'} mb-8 text-xl px-4 py-2  border-blue-500 border-2 rounded hover:text-black hover:bg-white transition-all duration-300`}>Profile</Link>         
                <Link onClick={handleLogout} to='/login' className={`${isLoggedIn ? "block" : "hidden" } mb-8 text-xl px-4 py-2  border-blue-500 border-2 rounded hover:text-black hover:bg-white transition-all duration-300`}>Logout</Link>         
                
    </div>
    </>
    
  )
}
