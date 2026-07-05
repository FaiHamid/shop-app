const orders = [];

export const OrdersService = {
    create(order) {
        orders.push(order);
        return order;
    },

    findAll(filters) {
        let result = [...orders];

        if (filters.category) {
            result = result.filter(o => o.category === filters.category);
        }

        if (filters.dateFrom) {
            result = result.filter(o => new Date(o.date) >= new Date(filters.dateFrom));
        }

        if (filters.dateTo) {
            result = result.filter(o => new Date(o.date) <= new Date(filters.dateTo));
        }

        return result;
    },

    findById(id) {
        return orders.find(o => o.id === id);
    },

    update(id, data) {
        const index = orders.findIndex(o => o.id === id);
        if (index === -1) return null;

        orders[index] = { ...orders[index], ...data };
        return orders[index];
    },

    delete(id) {
        const index = orders.findIndex(o => o.id === id);
        if (index === -1) return false;

        orders.splice(index, 1);
        return true;
    }
};