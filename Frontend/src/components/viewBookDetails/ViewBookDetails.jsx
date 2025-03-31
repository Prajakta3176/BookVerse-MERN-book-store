import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GrLanguage } from "react-icons/gr";
import { useParams } from 'react-router';
import Loader from '../loader/Loader';
export default function ViewBookDetails() {
    const [book , setBook] = useState();
    const {id} = useParams()

    useEffect(()=>{
       const fetch = async()=>{
        const res = await axios.get(`http://localhost:8080/get-book-by-id/${id}`)
        console.log(res.data.url);
        setBook(res.data);
       }

       fetch();
    },[]);


  return (
    <div className='bg-zinc-900 px-5 md:px-12 py-10 flex flex-col md:flex-row items-center justify-center gap-4 text-white'>
                {
                   !book && <div className='mt-5'>{
                         <Loader/>
                            }
                        </div>
                }
            <div className={`${book ? 'bg-zinc-800' : ""} p-4 py-8 h-[70vh] w-full md:w-3/6 flex items-center justify-center rounded`}>
                <img className='h-[60vh]' src={book?.url} alt="" />{" "}
            </div>
            <div className='p-4 w-full md:w-3/6 bg-zinc-800 rounded'>
                <h1 className='text-4xl text-zinc-300 font-semibold'>{book?.title}</h1>
                <p className='text-zinc-400 mt-1'>{book?.author}</p>
                <p className='text-zinc-500 mt-4 text-xl'>{book?.description}</p>
                <p className='flex mt-4 items-center justify-start text-zinc-400'>
                    <GrLanguage className='me-3'/>
                {book?.language}
                </p>
                <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price : &#8377; {book?.price}</p>   {" "}             
            </div>
    </div>
  )
}
