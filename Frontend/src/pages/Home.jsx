import React from 'react'
import Hero from '../components/home/Hero'
import RecentlyAddedBooks from '../components/home/RecentlyAddedBooks'

export default function Home() {
  return (
    <div className='bg-zinc-900  text-white md:px-15 sm:py-15 md:py-0'>
      {/* md:px-15 md:py-18 sm:py-15 py-5  */}
        <Hero/>
        <RecentlyAddedBooks/>
    </div>
  )
}
