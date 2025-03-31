
import authenticateToken from "./userAuth.js";
import { addBook, addBooks, deleteBook, getAllBooks, getBookById, getRecentlyAddedBooks, updateBook } from '../controller/book.js';
import express from 'express';
const router = express.Router();

//add book --admin
router.post('/add-book', authenticateToken, addBook )
router.post('/add-books', authenticateToken, addBooks )
.patch('/update-book', authenticateToken, updateBook )
.delete('/delete-book',authenticateToken, deleteBook)
.get('/get-all-books',getAllBooks)
.get('/get-recent-books',getRecentlyAddedBooks)
.get('/get-book-by-id/:id',getBookById)


export default router;