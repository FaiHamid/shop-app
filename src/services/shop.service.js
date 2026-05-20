
import Order from '../models/order.model.js';


export async function updateOrderById(id, body) {

    const order = await Order.findByPk(id);

    if (!order) {
        throw new Error(`Order with ${id} not found, try another`);
    }

    await order.update(body);
    
    return await null;
}

export async function createNewOrder(createdAt, category, cost) {
    return await Order.create({
        createdAt: createdAt,
        category: category,
        cost: cost
    });
}

export async function getAllOrders() {
    return await Order.findAll();
}

export async function getOrdersFilter(filter) {

    return await Order.findAll({
        where: filter,
        order: [['createdAt', 'DESC'],['id','ASC']]
    });
}