import express from 'express';
import ordersRoutes from './routes/order.routes.js';

const PORT =  process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use('/orders', ordersRoutes);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
