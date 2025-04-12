import './App.css'
import Home from './pages/Home.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { BrowserRouter as Router , Routes, Route } from 'react-router';
import AllBooks from './pages/AllBooks.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import ViewBookDetails from './components/viewBookDetails/ViewBookDetails.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth.js';
import Favorites from './components/profile/Favorites.jsx';
import OrderHistory from './components/profile/OrderHistory.jsx';
import Settings from './components/profile/Settings.jsx';
import AllOrders from './pages/AllOrders.jsx';
import AddBooks from './pages/AddBooks.jsx';
import UpdateBook from './pages/UpdateBook.jsx';
import UserData from './pages/UserData.jsx';
function App() {

const dispatch = useDispatch();
const role = useSelector((state)=>state.auth.role);

useEffect(()=>{
  if(localStorage.getItem('id') &&
  localStorage.getItem('token') &&
  localStorage.getItem('role')
  ){
    dispatch(authActions.login());
    dispatch(authActions.changeRole({role : localStorage.getItem('role')}));
  }
},[])

  return (
    <>
    <div className='h-[100vh] overflow-x-hidden'>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route  path="/all-books" element={<AllBooks/>} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/sign-up" element={<SignUp/>} />
      <Route  path="/cart" element={<Cart/>} />
      <Route  path="/profile" element={<Profile/>} > 
          {
            role === 'user' ? <Route index  element={<Favorites/>} />  : <Route index  element={<AllOrders/>} /> 
          }
          <Route path="/profile/order-history"  element={<OrderHistory/>} /> 
          <Route path="/profile/settings"  element={<Settings/>} /> 
          <Route path="/profile/all-orders"  element={<AllOrders/>} /> 
          <Route path="/profile/add-book"  element={<AddBooks/>} /> 
      </Route>
      <Route  path="/view-book-details/:id" element={<ViewBookDetails/>} /> 
      <Route  path="/update-book/:id" element={<UpdateBook/>} /> 
      <Route  path="/user-data/:id" element={<UserData/>} /> 
    </Routes>

    <Footer/>
    </div>
    
    </>
  )
}

export default App
