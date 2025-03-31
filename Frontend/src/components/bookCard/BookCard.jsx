import React from 'react'
import { Link } from 'react-router-dom';

export default function BookCard({book}) {
    const {title,author,price,description,url,language} = book;
  return (
    <Link to={`/view-book-details/${book._id}`}>
        <div className='bg-zinc-800 rounded p-4 sm:w-auto flex flex-col sm:h-[50vh]'>
              <div className='bg-zinc-900 rounded overflow-hidden flex items-center justify-center'>
                    <img className='h-[30vh]' src={url} alt="book"/>
              </div>
              <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{title}</h2>
              <p className='mt-2 text-zinc-400 font-semibold'>{author}</p>
              <p className='mt-2 text-zinc-200 font-semibold'>&#8377; {price}</p>
        </div>
    </Link>
  )
}
