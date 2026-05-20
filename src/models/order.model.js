
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Order = sequelize.define('Order', {
    category: {
        type: DataTypes.STRING
    },
    cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

export default Order;