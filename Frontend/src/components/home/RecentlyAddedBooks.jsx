import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../bookCard/BookCard';
import Loader from '../loader/Loader';
export default function RecentlyAddedBooks() {
    const [books, setBooks] = useState();
    useEffect(()=>{
        const fetch = async()=>{
           const res =  await axios.get('http://localhost:8080/get-recent-books');
            console.log(res.data);
            setBooks(res.data);
        }
        fetch();
    },[])
  return (
    <div className='py-15 px-4 flex flex-col justify-center items-center'>
        <h4 className='text-3xl text-center text-yellow-200'>Recently added books</h4>

        {
           !books && <div className='mt-5'>{
                 <Loader/>
                }
            </div>
        }
        <div className='py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
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
