import User from './User.js';
import Order from './Order.js';


User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

export { User, Order };