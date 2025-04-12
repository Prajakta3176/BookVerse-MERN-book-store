import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router';
import BookCard from '../components/bookCard/BookCard';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
import hero from '../assets/empty-cart.png'


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
const [total, setTotal] = useState(0);
const navigate = useNavigate()
  const headers = {
    id:localStorage.getItem('id'),
    authorization : `Bearer ${localStorage.getItem('token')}`

  }

  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get('http://localhost:8080/get-all-cart-books',{headers});
      setCartItems(res.data)
    }
    fetch();
  },[])

  // console.log(cartItems?.length);
  const handleDeleteItem = async(bookid)=>{
    console.log(bookid);
    const headers = {
      bookid :  bookid,
      id:localStorage.getItem('id'),
      authorization : `Bearer ${localStorage.getItem('token')}`
  
    }
    await axios.put(`http://localhost:8080/remove-book-from-cart`,{},{headers});

    const res = await axios.get('http://localhost:8080/get-all-cart-books', { headers });
    setCartItems(res.data);
      
  }

  useEffect(()=>{
    if(cartItems && cartItems.length > 0){
      let total = 0 ;
      cartItems.map((items)=>{
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  },[cartItems])

  // console.log(total);

  const placeOrder = async()=>{
      try{
        const res = await axios.post(`http://localhost:8080/place-order`,cartItems,{headers});
        alert(res.data.message);
        navigate('/profile/order-history')
        setCartItems([])
      }catch(err){
        alert(err)
      }
  }
  console.log(cartItems?.length);

  return (
    <div className={`bg-zinc-900 p-8 pt-6 flex flex-col items-center ${cartItems ? 'min-h-screen' : 'h-auto'}`}>
                  <h1 className={`${!(cartItems?.length === 0) ? "block" : "hidden" } text-3xl text-center text-yellow-200` }>Cart</h1>
                  {
                                 (cartItems?.length === 0) && <div className='mt-5 flex items-center justify-center'>{
                                      <div className='flex flex-col justify-center items-center'>
                                        <img className='w-[100%] sm:w-[20vw] mb-7' src={hero} alt="" />
                                      <h2 className='text-2xl text-zinc-200 font-semibold'>Your cart is empty</h2>
                                      <p className=' font-semibold text-zinc-400 text-center'>Just relax, let us help you find some <br /> read-worthy books</p>
                                      <Link to='/all-books' className='py-3 px-5 rounded mt-3 text-zinc-900 font-semibold bg-yellow-300 hover:rounded-4xl transition-all duration-500'>Start Shopping</Link>
                                      </div>
                                      }
                                  </div>
                              }
                  <div className='py-4 flex flex-col gap-6 items-center'>
                              {
                                  cartItems?.map((book,index)=>(
                                      <div className='bg-zinc-800 py-4 px-6 flex items-center gap-20 w-[70vw] rounded-xl' key={index}>
                                        <img className='w-[60px]' src={book.url} alt="" />
                                        <div className='flex-1 mx-4 overflow-hidden'>
                                          <p className='text-zinc-100 font-semibold text-xl'>{book.title}</p>
                                          <p className='text-zinc-200 whitespace-nowrap overflow-hidden text-ellipsis mr-4 '>{book.description}</p>
                                        </div>
                                        <p className='text-2xl font-semibold text-white whitespace-nowrap'>&#8377; {book.price}</p>
                                        <div onClick={()=>{handleDeleteItem(book._id)}} className='text-2xl text-red-500 border p-2 bg-red-300 rounded'><MdDelete/></div>
                                      </div>
                                  ))
                              }
                          
                  </div>

                  <div className='w-[70vw] flex items-end justify-end'>
                              {
                                cartItems?.length > 0 && (
                                  <div className='mt-4 w-max flex flex-col items-center justify-end'> 
                                      <div className='p-4 bg-zinc-800 rounded'>
                                        <h1 className='text-2xl font-semibold text-zinc-200'>Total Amount</h1>

                                        <div className='mt-3 flex items-center justify-between text-md text-zinc-200'>
                                        <h2>{cartItems?.length} books</h2>
                                        <h2>&#8377; {total}</h2>
                                      </div>

                                      <div className='w-[100%] mt-3'>
                                        <button onClick={placeOrder} className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200'>
                                          Place your order
                                        </button>
                                      </div>
                                      </div>                        
                                  </div> 
                                )
                              }
                  </div>
    </div>
  )
}
