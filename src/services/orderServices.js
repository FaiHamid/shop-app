import { v4 as uuid } from 'uuid';
import { pool } from '../database/db.js';

export const getOrders = async ({ category, dateFrom, dateTo }) => {
    let query = 'SELECT * FROM orders WHERE 1=1';
    const values = [];

    if (category) {
        values.push(category);
        query += ` AND category = $${values.length}`;
    }

    if (dateFrom) {
        values.push(dateFrom);
        query += ` AND date >= $${values.length}`;
    }

    if (dateTo) {
        values.push(dateTo);
        query += ` AND date <= $${values.length}`;
    }

    const result = await pool.query(query, values);
    return result.rows;
};

export const getOrderById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM orders WHERE id = $1',
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error('Order was not found');
    }

    return result.rows[0];
};

export const createOrder = async ({ date, category, cost }) => {
    if (!date || !category || cost === undefined) {
        throw new Error('Missing fields');
    }

    if (typeof cost !== 'number') {
        throw new Error('Cost must be a number');
    }

    const id = uuid();

    const result = await pool.query(
        'INSERT INTO orders (id, date, category, cost) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, date, category, cost]
    );

    return result.rows[0];
};

export const updateOrder = async (id, { date, category, cost }) => {
    const result = await pool.query(
        `UPDATE orders 
         SET date = $1, category = $2, cost = $3 
         WHERE id = $4 
         RETURNING *`,
        [date, category, cost, id]
    );

    if (result.rows.length === 0) {
        throw new Error('Order was not found');
    }

    return result.rows[0];
};

export const patchOrder = async (id, { date, category, cost }) => {
    const existing = await pool.query(
        'SELECT * FROM orders WHERE id = $1',
        [id]
    );

    if (existing.rows.length === 0) {
        throw new Error('Order was not found');
    }

    const order = existing.rows[0];

    const newDate = date ?? order.date;
    const newCategory = category ?? order.category;
    const newCost = cost ?? order.cost;

    if (newCost !== undefined && typeof newCost !== 'number') {
        throw new Error('Cost must be a number');
    }

    const result = await pool.query(
        `UPDATE orders 
         SET date = $1, category = $2, cost = $3 
         WHERE id = $4 
         RETURNING *`,
        [newDate, newCategory, newCost, id]
    );

    return result.rows[0];
};

export const deleteOrder = async (id) => {
    const result = await pool.query(
        'DELETE FROM orders WHERE id = $1 RETURNING *',
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error('Order was not found');
    }

    return result.rows[0];
};