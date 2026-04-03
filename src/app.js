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
        filteredOrders = filteredOrders.filter(o => o.category === category);
    }
    if (dateFrom) {
        filteredOrders = filteredOrders.filter(o => o.date >= dateFrom);
    }
    if (dateTo) {
        filteredOrders = filteredOrders.filter(o => o.date <= dateTo);
    }

    res.json(filteredOrders);
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

app.post('/orders', (req, res) => {
    const { date, category, cost } = req.body;

    if (!date || !category || !cost) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = {
        id: Date.now().toString(),
        date,
        category,
        cost
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(o => o.id === id);

    if (index !== -1) {
        orders[index] = { id, ...req.body };
        res.json(orders[index]);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

app.patch('/orders/:id', (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(o => o.id === id);

    if (index !== -1) {
        orders[index] = { ...orders[index], ...req.body };
        res.json(orders[index]);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(o => o.id === id);

    if (index !== -1) {
        orders = orders.filter(o => o.id !== id);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Shop App is running on http://localhost:${PORT}`);
});