import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../components/bookCard/BookCard';
import Loader from '../components/loader/Loader';

export default function AllBooks() {
  
  const [books , setBooks] = useState();

  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get('http://localhost:8080/get-all-books');
      console.log(res.data);
      setBooks(res.data)
    }

    fetch();
      
  },[])

  return (
    <div className='bg-zinc-900 p-8 h-auto'>
        <h4 className='text-3xl text-center text-yellow-200'>All books</h4>

       {
           !books && <div className='mt-5 flex items-center justify-center h-screen'>{
                 <Loader/>
                }
            </div>
        }
        <div className='py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 '>
        {
            books?.map((book,index)=>(
                <div key={index}>
                <BookCard  book = {book}/>        
                </div>
            ))
        }
        </div>
    </div>
  )
}
