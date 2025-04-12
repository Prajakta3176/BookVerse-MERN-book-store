import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import noOrder from '../assets/no-order.png';
import { FaUser } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';
import UserData from './UserData';

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [option, setOption] = useState();
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();
  const userDetailsRef = useRef(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:8080/get-all-orders', { headers });
      setAllOrders(res.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDetailsRef.current &&
        !userDetailsRef.current.contains(event.target)
      ) {
        setUserDiv("hidden");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeStatus = async (id) => {
    await axios.put(
      `http://localhost:8080/update-status/${id}`,
      { status: option },
      { headers }
    );

    setAllOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: option } : order
      )
    );
  };

  const totalOrders = allOrders.length;
  const uniqueUsers = new Set(allOrders.map(order => order.user?._id)).size;
  const uniqueBooks = new Set(allOrders.filter(order => order.book).map(order => order.book._id)).size;

  return (
    <>
      {totalOrders === 0 ? (
        <div className="flex flex-col w-full items-center justify-center text-center">
          <img className="w-[30vw] md:w-[20vw]" src={noOrder} alt="No Orders" />
          <p className="font-semibold text-zinc-400 md:text-xl">
            Looks like you haven’t received any orders.
          </p>
        </div>
      ) : (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Your Orders</h1>

          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-8 flex gap-2 items-center'>
            <div className='w-[3%] text-center'>Sr.</div>
            <div className='w-[22%]'>Books</div>
            <div className='w-[35%] md:w-[40%]'>Description</div>
            <div className='w-[11%] md:w-[9%]'>Price</div>
            <div className='w-[19%] md:w-[16%]'>Status</div>
            <div className='w-none md:w-[5%] md:block'><FaUser /></div>
          </div>

          {allOrders.map((order, index) => (
            <div
              key={order._id}
              className='mt-4 bg-zinc-800 w-full rounded py-2 px-8 flex gap-2 items-center'
            >
              <div className='w-[3%] text-center'>{index + 1}</div>

              <div className='w-[22%]'>
                <Link to={`/view-book-details/${order?.book?._id}`}>
                  {order.book?.title || "N/A"}
                </Link>
              </div>

              <div className='w-[35%] md:w-[40%]'>
                {order.book?.description.slice(0, 40) || "No Description"}...
              </div>

              <div className='w-[11%] md:w-[9%]'>
                ₹{order.book?.price || "0"}
              </div>

              <div className='w-[19%] md:w-[16%] font-semibold'>
                <button className='hover:scale-105 transition-all duration-300'>
                  {order.status === "Order placed" ? (
                    <div className='text-yellow-500'>{order.status}</div>
                  ) : order.status === "Cancelled" ? (
                    <div className='text-red-500'>{order.status}</div>
                  ) : (
                    <div className='text-green-500'>{order.status}</div>
                  )}
                </button>

                <div className='flex'>
                  <select
                    onChange={(e) => setOption(e.target.value)}
                    className='bg-gray-800'
                  >
                    {["Order placed", "Out for delivery", "Delivered", "Cancelled"].map((item, i) => (
                      <option key={i} value={item}>{item}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => changeStatus(order._id)}
                    className='text-green-500 hover:text-pink-600 mx-2'
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>

              <div className='w-none md:w-[5%] md:block text-xl' title={order.user?.name || "Unknown"}>
                <button
                  onClick={() => {
                    setUserDivData(order.user);
                    setUserDiv("fixed");
                  }}
                  className='hover:text-red-400'
                >
                  <HiOutlineExternalLink />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <UserData
          ref={userDetailsRef}
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
}
