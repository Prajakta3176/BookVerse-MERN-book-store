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
function App() {

  return (
    <>
    <div className='h-[100vh]'>
    <Navbar/>

    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route  path="/all-books" element={<AllBooks/>} />
      <Route  path="/login" element={<Login/>} />
      <Route  path="/sign-up" element={<SignUp/>} />
       <Route  path="/cart" element={<Cart/>} />
      <Route  path="/profile" element={<Profile/>} /> 
      <Route  path="/view-book-details/:id" element={<ViewBookDetails/>} /> 
    </Routes>

    <Footer/>
    </div>
    
    </>
  )
}

export default App
