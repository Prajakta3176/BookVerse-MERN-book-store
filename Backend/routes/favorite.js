import authenticateToken from "./userAuth.js";
import express from 'express';
import { addBookInFavorites, deleteBookFromFavorites, getAllFavBooks } from "../controller/favorite.js";
const router = express.Router()

// add book to favorites
router.put('/add-book-in-favorites',authenticateToken,addBookInFavorites)
.put('/remove-book-from-favorites', authenticateToken, deleteBookFromFavorites)
.get('/get-favorite-books',authenticateToken, getAllFavBooks)

export default router;