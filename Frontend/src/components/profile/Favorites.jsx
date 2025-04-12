import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../loader/Loader';
import BookCard from '../bookCard/BookCard';
import { CiHeart } from "react-icons/ci";
export default function Favorites() {
  const [favorites, setFavorites] = useState();
  useEffect(()=>{

    const headers = {
      id:localStorage.getItem('id'),
      authorization : `Bearer ${localStorage.getItem('token')}`
  
    }
    const fetch = async()=>{
      const res = await axios.get('http://localhost:8080/get-favorite-books',{headers});
      console.log(res.data);
      setFavorites(res.data);
    
    }

    fetch();
  },[])
  return (
    <div className={`bg-zinc-900 p-8 pt-0 flex flex-col items-center justify-around ${favorites ? 'h-auto' : 'h-screen'}`}>
            <h4 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Favorites</h4>
    
           {
               !favorites && <div className='mt-5 flex items-center justify-center'>{
                    //  <Loader/>
                    <div className='flex flex-col justify-center items-center'>
                    <CiHeart className='text-8xl text-zinc-500 font-semibold'/>
                    <h2 className='text-2xl text-zinc-500 font-semibold'>Your wishlist is empty</h2>
                    </div>
                    }
                </div>
            }
            <div className='py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
            {
                favorites?.map((book,index)=>(
                    <div key={index}>
                    <BookCard  book = {book}/>        
                    </div>
                ))
            }
            </div>
        </div>
  )
}
