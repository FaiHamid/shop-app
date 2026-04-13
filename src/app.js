import express from 'express';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

let orders = [
    { id: "1", date: "2026-03-30", category: "electronics", cost: 250 },
    { id: "2", date: "2026-04-01", category: "clothing", cost: 50 }
];

app.get('/orders', (req, res) => {
    const { category, dateFrom, dateTo } = req.query;
    let filteredOrders = [...orders];

    if (category) {
        const categoriesArray = Array.isArray(category) ? category : [category];
        filteredOrders = filteredOrders.filter(order => categoriesArray.includes(order.category));
    }
    
    if (dateFrom) {
        filteredOrders = filteredOrders.filter(order => new Date(order.date) >= new Date(dateFrom));
    }
    
    if (dateTo) {
        filteredOrders = filteredOrders.filter(order => new Date(order.date) <= new Date(dateTo));
    }

    res.json(filteredOrders);
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(order => order.id === req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

app.post('/orders', (req, res) => {
    const { category, cost } = req.body;

    if (!category || cost === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (typeof cost !== 'number') {
        return res.status(400).json({ message: "Cost must be a number" });
    }

    const newOrder = {
        id: Date.now().toString(),
        date: new Date(), 
        category,
        cost
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(order => order.id === id);

    if (index !== -1) {
        orders[index] = { id, ...req.body };
        res.json(orders[index]);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

app.patch('/orders/:id', (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(order => order.id === id);

    if (index !== -1) {
        orders[index] = { ...orders[index], ...req.body };
        res.json(orders[index]);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(order => order.id === id);

    if (index !== -1) {
        orders = orders.filter(order => order.id !== id);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Shop App is running on http://localhost:${PORT}`);
});