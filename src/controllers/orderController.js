import { Order } from '../models/index.js';
import { Op } from 'sequelize';

export const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const { category, dateFrom, dateTo } = req.query;
        const whereClause = {};

        // Фільтрація за категорією
        if (category) {
            whereClause.category = category;
        }

        // Фільтрація за періодом дат
        if (dateFrom || dateTo) {
            whereClause.date = {};
            if (dateFrom) whereClause.date[Op.gte] = dateFrom; 
            if (dateTo) whereClause.date[Op.lte] = dateTo;    
        }

        const orders = await Order.findAll({ where: whereClause });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const [updated] = await Order.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) return res.status(404).json({ message: 'Order not found' });
        
        const updatedOrder = await Order.findByPk(req.params.id);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};