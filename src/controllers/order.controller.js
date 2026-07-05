import { OrdersService } from '../services/order.service.js';
import { Order } from '../models/order.model.js';

export const OrdersController = {
    create(req, res) {
        const { id, date, category, cost } = req.body;

        const order = new Order(id, date, category, cost);
        const created = OrdersService.create(order);

        res.status(201).json(created);
    },

    getAll(req, res) {
        const filters = req.query;
        const orders = OrdersService.findAll(filters);

        res.json(orders);
    },

    getById(req, res) {
        const order = OrdersService.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Немає' });
        }

        res.json(order);
    },

    update(req, res) {
        const updated = OrdersService.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ message: 'Немає' });
        }

        res.json(updated);
    },

    delete(req, res) {
        const deleted = OrdersService.delete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Немає' });
        }

        res.json({ message: 'видалено' });
    }
};