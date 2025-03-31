import React from 'react'
import {Link} from 'react-router-dom';
import hero from '../../assets/png2.png'

export default function Hero() {
  return (
    // h-[85vh] sm:h-[100vh]
    <div className='h-[85vh] flex flex-col-reverse justify-center  gap-3 md:gap-5 text-center md:text-start md:flex-row md:justify-around sm:justify-center sm:py-20 md:py-0'>
        <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center px-5 md:py-5'>
        <h1 className='text-4xl md:text-6xl font-semibold text-yellow-100'>Discover Your Next Read</h1>
        <p className='my-4 md:my-8 text-md md:text-xl text-zinc-300'>Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
        <div className='mt-4'>
        <Link to='/all-books' className='text-xl md:text-2xl border border-yellow-100  px-8 py-2 md:px-10 md:py-3 rounded-4xl text-yellow-100 font-semi-bold hover:bg-zinc-700 transition-all duration-300'>Discover Books</Link>
        </div>
        </div>
        <div className='w-full lg:w-3/6 lg:h-[100%] flex items-center justify-center'>
        <img className='w-[100%]' src={hero} alt="" />
        </div>
    </div>
  )
  // h-[80vh] sm:h-[100vh] md:h-[75vh] sm:py-20
}
