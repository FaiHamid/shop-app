import express from 'express';
import { OrdersController } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', OrdersController.create);
router.get('/', OrdersController.getAll);
router.get('/:id', OrdersController.getById);
router.put('/:id', OrdersController.update);
router.delete('/:id', OrdersController.delete);

export default router;