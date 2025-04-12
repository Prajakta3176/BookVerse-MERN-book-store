import React, { useEffect, useState } from 'react'
import { GrLanguage } from "react-icons/gr";
import { Link, useNavigate, useParams } from 'react-router';
import Loader from '../loader/Loader';
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
export default function ViewBookDetails() {
    const [book , setBook] = useState();
    const {id} = useParams();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const role = useSelector((state) => state.auth.role)
    const [isFavorite , setIsFavorite] = useState(false);
    const [isCart, setIsCart] = useState(false);   
    const [openUpdate , setOpenUpdate] = useState(false);
    const navigate = useNavigate();
    const headers = {
        bookid : id,
        id:localStorage.getItem('id'),
        authorization : `Bearer ${localStorage.getItem('token')}`
    
      }
    // console.log(isLoggedIn);
    useEffect(()=>{
       const fetch = async()=>{
        const res = await axios.get(`http://localhost:8080/get-book-by-id/${id}`)
        // console.log(res.data.url);
        setBook(res.data);
       }

       fetch();

       const getUser = async ()=>{
        const user = await axios.get(`http://localhost:8080/user-information`,{headers});
        // console.log(user.data.favorites);
        //  console.log(user.data.cart);
        const favorites = user?.data?.favorites;
        const cartItems = user?.data?.cart;
        if(favorites?.includes(id)){
            setIsFavorite(true);
        }
        if(cartItems?.includes(id)){
            setIsCart(true);
        }
        
       }
       getUser();
    },[]);

    // console.log(book);

    const handleFavorite = async()=>{

        if(!isFavorite){
            const res = await axios.put('http://localhost:8080/add-book-in-favorites',{},{headers});
            setIsFavorite(true);
            console.log("added in fav");  
        }else{
            const res = await axios.put('http://localhost:8080/remove-book-from-favorites',{},{headers});
            setIsFavorite(false);
            console.log("Removed from fav");
        }
    }

    const handleCart = async()=>{
        if(!isCart){
            const res = await axios.put('http://localhost:8080/add-book-in-cart',{},{headers});
            console.log(res.data);
            setIsCart(true)
        }else{
            const res = await axios.put('http://localhost:8080/remove-book-from-cart',{},{headers});
            console.log(res.data);
            setIsCart(false);
        }
    }
// console.log(isCart);

// admin
const handleEdit = async()=>{
    
}

const handleDelete = async()=>{
    const res = await axios.delete('http://localhost:8080/delete-book',{headers})
    alert(res.data.message);
    navigate('/all-books')
}

  return (
    <div className='bg-zinc-900 px-5 md:px-12 py-10 flex flex-col md:flex-row items-center justify-center md:gap-4 w-full text-white'>
        {
                           !book ? <div className='mt-5 flex items-center-justify-center h-screen'>{
                                 <Loader/>
                                    }
                                </div>  :
                        
                   (<React.Fragment>
                    <div className={`h-[70vh] w-full lg:w-2/6`}>
                        <div className={`bg-zinc-800 flex flex-col sm:flex-row items-center md:items-start justify-center rounded-2xl gap-4 p-4 py-8`}>
                        <img className='h-[40vh] bg-zinc-700 min-w-[200px] sm:min-w-[250px] md:h-[50vh] rounded' src={book?.url} alt="" />{" "}
                        {
                            (isLoggedIn && role === "user") ? (<div className='flex flex-row sm:flex-col gap-4 text-2xl'>
                                <button onClick={handleFavorite} className={`${isFavorite ? 'text-red-500' :  'text-zinc-500'} bg-white rounded sm:rounded-full text-xl sm:text-2xl px-2 py-2 sm:p-3 flex items-center justify-center`}>
                                    <FaHeart /> <span className='block sm:hidden text-sm font-semibold ml-2'>Favorites</span>
                                </button>
                                <button onClick={handleCart} className={` ${isCart ? 'bg-blue-500 text-white' :  'text-zinc-500 bg-white'}   rounded sm:rounded-full text-2xl px-3 py-2 sm:p-3 flex items-center justify-center transition-all duration-300`}>
                                    <FaShoppingCart /> <span className='block sm:hidden text-sm font-semibold ml-2'>Add to cart</span>
                                </button>
                            </div>) : ""
                        } 
        
                        {
                            (isLoggedIn && role === "admin") ? (<div className='flex flex-row sm:flex-col gap-4 text-2xl'>
                                <Link to={`/update-book/${id}`} onClick={handleEdit} className='bg-white text-zinc-700 hover:text-white hover:bg-zinc-600  rounded sm:rounded-full text-xl sm:text-2xl px-2 py-2 sm:p-3 flex items-center justify-center transition-all duration-300'>
                                    <FaEdit /> <span className='block sm:hidden text-sm font-semibold ml-2'>Edit</span>
                                </Link>
                                <button onClick={handleDelete} className='bg-white text-zinc-700 hover:text-white hover:bg-zinc-600 rounded sm:rounded-full text-2xl px-3 py-2 sm:p-3 flex items-center justify-center transition-all duration-300'>
                                <MdDelete /> <span className='block sm:hidden text-sm font-semibold ml-2'>Delete</span>
                                </button>
                            </div>) : ""
                        }
                        </div>
                    </div>
                    <div className='p-4 w-full lg:w-4/6 bg-zinc-800 rounded'>
                        <h1 className='text-4xl text-zinc-300 font-semibold'>{book?.title}</h1>
                        <p className='text-zinc-400 mt-1'>by {book?.author}</p>
                        <p className='text-zinc-500 mt-4 text-xl'>{book?.description}</p>
                        <p className='flex mt-4 items-center justify-start text-zinc-400'>
                            <GrLanguage className='me-3'/>
                        {book?.language}
                        </p>
                        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price : &#8377; {book?.price}</p>   {" "}             
                    </div>
                    </React.Fragment>)
                }
    </div>
  )
}

{/* <FaHeart /> */}
{/* <FaShoppingCart /> */}