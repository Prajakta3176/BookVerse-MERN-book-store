import express from 'express';
const router = express.Router();
import authenticateToken from './userAuth.js';
import { addBookInCart, deleteBookFromCart, getAllCartBooks } from '../controller/cart.js';


router.put('/add-book-in-cart',authenticateToken,addBookInCart)
.put('/remove-book-from-cart',authenticateToken,deleteBookFromCart)
.get('/get-all-cart-books',authenticateToken,getAllCartBooks)


export default router;