
import { Op } from 'sequelize';
import { getOrdersFilter , createNewOrder, updateOrderById } from '../services/shop.service.js';
import Order from '../models/order.model.js';


export const updateOrder = async (req,res) => {
    
    try { 

        const { id } = req.params;

        await updateOrderById(id,req.body);

        res.status(200).json({
            message: `Order with id: ${id} succesfully updated`,
            data: order
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteOrder = async (req,res) => {
    
    try {

        const { id } = req.params;
        
        if (id == null){
            throw new Error("Need id to delete order");
        }

        const deletedCount = await Order.destroy({
            where: { id: id }
        });

        if(deletedCount == 0) {
            throw new Error(`Order with id: ${id} not fould, try another`);
        }

        res.status(200).json({
            message: `Order with id: ${id} deleted succesfully`
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res) => {
    
    try { 

        const { date , category , cost } = req.body; 

        if(category == null) {
            throw new Error("Need category to add");
        }
        if(cost < 0) {
            throw new Error("Cost cannot be negative");
        }

        const newOrder = await createNewOrder(date ,category, cost);

        res.status(201).json({
            message: 'Order succesfully created in postgres',
            order: newOrder
        });
    } catch (error) {

        console.log('Create error: ', );

        res.status(500).json({ error: error.message });
    }
}

export const getOrders = async (req, res) => {

    try {

        const { category, dateFrom, dateTo } = req.query;

        let filter = {};

        if(category) {
            filter.category = category;
        }

        if(dateFrom && dateTo) {
            filter.createdAt = {
                [Op.between]: [new Date(dateFrom),new Date(dateTo)]
            };
        } else if(dateFrom) {

            const from = new Date(dateFrom);

            filter.createdAt = { [Op.gte]: from };
        } else if(dateTo) {

            const to = new Date(dateTo);

            filter.createdAt = { [Op.lte]: to };
        }

        const orders = await getOrdersFilter(filter);

        return res.status(200).json(orders);

    } catch (error) {

        res.status(500).json( { error: error.message} );
    }
}