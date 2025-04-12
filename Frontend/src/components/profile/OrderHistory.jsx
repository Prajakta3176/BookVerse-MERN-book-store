import React, { useEffect, useState } from 'react'
import axios from 'axios';
import noOrder from '../../assets/out-of-stock.png'
import Loader from '../loader/Loader.jsx'
import { Link } from 'react-router-dom';
export default function OrderHistory() {
  const [orderHistory , setOrderHistory] = useState([]);
  const headers = {
    id:localStorage.getItem('id'),
    authorization : `Bearer ${localStorage.getItem('token')}`

  }
  useEffect(()=>{
      const fetch = async()=>{
      const res = await axios.get('http://localhost:8080/get-order-history', { headers });
        setOrderHistory(res.data);
      }
      fetch();
  },[])
  console.log(orderHistory);
  return (
    <>{
      !orderHistory && (
        <div className='flex items-center justify-center h-[100%]'>
          <Loader/>
        </div>
      )
    }
        {
          orderHistory && orderHistory.length=== 0 &&(
            <div className='h-[80vh] w-full p-4 text-zinc-100'>
              <div className='h-full p-4 text-zinc-100 flex flex-col items-center'>
                <h1 className=' text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>No Order History</h1>
                <img className='w-[20vw] mb-8' src={noOrder} alt="" />
              </div>

            </div>
          )
        }

        {
          orderHistory && orderHistory.length > 0 && (
            <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
              <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Your Order History</h1>

              <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-8 flex gap-2'>
                  <div className='w-[3%]'>
                      <h1 className='text-center'>Sr.</h1>
                  </div>
                  <div className='w-[22%]'>
                    <h1>
                      Books
                    </h1>
                  </div>
                  <div className='w-[35%] md:w-[40%]'>
                    <h1>
                      Description
                    </h1>
                  </div>
                  <div className='w-[11%] md:w-[9%]'>
                    <h1>
                      Price
                    </h1>
                  </div>
                  <div className='w-[19%] md:w-[16%]'>
                    <h1>
                      Status
                    </h1>
                  </div>
                  <div className='w-none md:w-[5%] hidden md:block'>
                    <h1>
                      Mode
                    </h1>
                  </div>
              </div>
              {
                orderHistory.map((item , i )=>(
                  <div key={i} className='mt-4 bg-zinc-800 hover:bg-zinc-900 w-full rounded py-2 px-4 flex gap-2'>
                  <div className='w-[3%]'>
                      <h1 className='text-center'>{i + 1}</h1>
                  </div>
                  <div className='w-[22%] '>
                    <Link className='hover:text-blue-500' to={`/view-book-details/${item.book._id}`}> {item.book.title.slice(0,20)}...</Link>
                  </div>
                  <div className='w-[35%] md:w-[40%]'>
                    <h1>
                     {item.book.description.slice(0,40)}...
                    </h1>
                  </div>
                  <div className='w-[11%] md:w-[9%] mx-2'>
                    <h1 className='whitespace-nowrap'>
                      &#8377; {item.book.price}
                    </h1>
                  </div>
                  <div className='w-[19%] md:w-[16%]'>
                    <h1 className='text-green-500 font-semibold'>
                      {
                        item.status === "Order placed" ? (
                          <div className='text-yellow-500'>
                              {item.status}
                          </div>                        
                          ) : item.status === "Canceled" ? (
                            <div className='text-red-500'>
                                {item.status}
                            </div>                        
                            ) : (item.status)
                      }
                    </h1>
                  </div>
                  <div className='w-none md:w-[5%] hidden md:block'>
                    <h1>
                      COD
                    </h1>
                  </div>
              </div>
                ))
              }
            </div>
          )
        }
    </>
  )
}
