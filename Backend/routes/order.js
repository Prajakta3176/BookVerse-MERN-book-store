import express from 'express';
const router = express.Router();
import authenticateToken from './userAuth.js';
import { getAllOrders, getOrderHistory, placeOrder, updateStatusOfOrder } from '../controller/order.js';


router.post('/place-order',authenticateToken, placeOrder)
.get('/get-order-history',authenticateToken, getOrderHistory)
.get('/get-all-orders',authenticateToken, getAllOrders)
.put('/update-status/:id', authenticateToken, updateStatusOfOrder)


export default router;