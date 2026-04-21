import express from 'express';
import dotenv from 'dotenv';
import orderRouter from './routes/orderRouter.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use('/orders', orderRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});