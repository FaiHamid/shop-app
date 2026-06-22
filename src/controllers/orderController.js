import * as orderService from "../services/orderServices.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders(req.query);
        res.status(200).json({ message: 'All Orders', orders });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const createdOrder = await orderService.createOrder(req.body);
        res.status(201).json({ message: 'Order was added', createdOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
        res.status(200).json({ message: 'Order was fully changed', updatedOrder });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const patchOrder = async (req, res) => {
    try {
        const order = await orderService.patchOrder(req.params.id, req.body);
        res.status(200).json({ message: 'Order was patched', order });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id);
        res.status(200).send({ message: 'Order was deleted' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};