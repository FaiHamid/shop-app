import { v4 as uniqId } from 'uuid';
import orders from '../data/orders.js';

export const getOrders = (req, res) => {
    const { category, dateFrom, dateTo } = req.query
    let filteredOrders = [...orders]
    if (category) {
        filteredOrders = filteredOrders.filter(order => order.category === category)
    }
    if (dateFrom) {
        filteredOrders = filteredOrders.filter(order => new Date(order.date) >= new Date(dateFrom))
    }
    if (dateTo) {
        filteredOrders = filteredOrders.filter(order => new Date(order.date) <= new Date(dateTo))
    }
    res.status(200).json({ message: 'All Orders', Orders: filteredOrders });
}
export const getOrderById = (req, res) => {
    const { id } = req.params
    const order = orders.find(order => order.id === id)
    res.status(200).json(order)
}
export const createOrder = (req, res) => {
    const { date, category, cost } = req.body;

    if (!date || !category || cost === undefined) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    if (typeof cost !== 'number') {
        return res.status(400).json({ message: 'Cost must be a number' });
    }

    const newOrder = {
        id: uniqId(),
        date,
        category,
        cost
    }
    orders.push(newOrder);

    res.status(201).json({ message: 'Order was added', newOrder });
}
export const updateOrder = (req, res) => {
    const { id } = req.params
    const { date, category, cost } = req.body;

    const index = orders.findIndex(order => order.id === id)

    if (index === -1) {
        return res.status(404).json({ message: 'Order was not found | Cannot patch' });
    }
    const newOrder = {
        id,
        date,
        category,
        cost
    }

    orders[index] = newOrder

    res.status(200).json({ message: 'Order was fully changed', newOrder });
}
export const patchOrder = (req, res) => {
    const { id } = req.params

    const { date, category, cost } = req.body
    const order = orders.find(order => order.id === id)
    
    if (!order) {
        return res.status(404).json({ message: 'Order was not found | Cannot patch' });
    }
    if (cost !== undefined && typeof cost !== 'number') {
        return res.status(400).json({ message: 'Cost must be a number' });
    }
    
    if (date !== undefined) order.date = date;
    if (category !== undefined) order.category = category;
    if (cost !== undefined) order.cost = cost;
    // const newFields = req.body
    // const patchedObj = Object.assign(findById, newFields)
    res.status(200).json({ message: 'Order was patched', order });
}
export const deleteOrder = (req, res) => {
    const { id } = req.params

    const index = orders.findIndex(order => order.id === id)

    if (index === -1) {
        return res.status(404).json({ message: 'Order was not found' });
    }

    const deleted = orders.splice(index, 1)
    res.status(204).json({ message: 'Order was deleted', deleted });
}