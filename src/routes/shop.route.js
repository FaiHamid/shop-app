
import express from 'express';
import { createOrder, deleteOrder, updateOrder , getOrders } from '../controllers/shop.controller.js';

const router = express.Router();

router.get('/', getOrders);

router.patch('/:id',updateOrder);
router.delete('/:id',deleteOrder);
router.post('/', createOrder);

export default router;
