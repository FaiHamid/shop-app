import express from 'express';
import orderRouter from './routes/orderRouter.js';
const PORT = process.env.PORT || 8000;

const app = express();



app.use(express.json());
//add get, post, put, patch, delete
app.use('/orders', orderRouter);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
