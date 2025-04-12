import React, { useState } from 'react'
import axios from 'axios';

export default function AddBooks() {

  const headers = {
    id:localStorage.getItem('id'),
    authorization : `Bearer ${localStorage.getItem('token')}`

  } 
  const [bookData , setBookData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  })

  const handleChange = (e)=>{
      const {name,value} = e.target;

      setBookData((prevData)=>({
        ...prevData, [name] : value
      }))

  }

  const handleSubmit = async()=>{
      try{
        if(bookData.url ==="" ||
          bookData.title ==="" ||
          bookData.price ==="" ||
          bookData.author ==="" ||
          bookData.language ==="" ||
          bookData.description ==="" 
          ){
            alert("Please fill all the fields")
            return;
        }else{
          const res = await axios.post('http://localhost:8080/add-book',bookData,{headers});
          setBookData({
            url: "",
            title: "",
            author: "",
            price: "",
            description: "",
            language: "",
          })
          alert(res.data.message);
    
        }
      }catch(err){
        alert(err?.response?.data?.message)
      }

    }

    

  return (
    <>
      <div className='p-4  rounded'>
        <fieldset className='border bg-zinc-800 border-zinc-500 p-4 rounded'>
          <legend className='text-2xl font-semibold  text-zinc-500 px-2'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Add Book</h1>
          </legend>
          <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="image">Image</label>
            <input onChange={(e)=>{handleChange(e)}} className='bg-zinc-900 p-3 rounded' id='image' type="url" name='url' value={bookData.url} placeholder='url of image' required/>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="title">Title</label>
            <input onChange={(e)=>{handleChange(e)}} className='bg-zinc-900 p-3 rounded' id='title' type="text" name='title' value={bookData.title} placeholder='title of book' required/>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="author">Author</label>
            <input onChange={(e)=>{handleChange(e)}} className='bg-zinc-900 p-3 rounded' id='author' type="text" name='author' value={bookData.author} placeholder='author of book' required/>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="language">Language</label>
            <input onChange={(e)=>{handleChange(e)}} className='bg-zinc-900 p-3 rounded' id='language' type="text" name='language' value={bookData.language} placeholder='language of book' required/>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="price">Price ( in rupees )</label>
            <input onChange={(e)=>{handleChange(e)}} className='bg-zinc-900 p-3 rounded' id='price' type="number" name='price' value={bookData.price} placeholder='price of book' required/>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="description">Description</label>
            <textarea onChange={(e)=>{handleChange(e)}} className='bg-zinc-900 p-3 rounded' id='description' name='description' value={bookData.description} placeholder='description of book' rows='5' required/>
          </div>
          <div className='flex flex-col gap-2 mt-4 items-end'>
            <button onClick={handleSubmit} className='px-9 py-3 bg-yellow-600 rounded hover:rounded-3xl transition-all duration-300 w-max text-zinc-900 font-semibold'>Add book</button>
          </div>
        </fieldset>
      </div>
    </>
  )
}