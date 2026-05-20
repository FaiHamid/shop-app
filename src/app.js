import express from 'express';
import dotenv from 'dotenv';
import router from '../../shop-app/src/routes/shop.route.js';
import sequelize from './db.js';

const PORT =  process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use('/orders',router);

dotenv.config();

async function testPgConnection() {

    try {
        
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Succesfully connected to postgresDB');

    } catch (error) {
        console.log(`Catched error: ${error}`);
    }
}

testPgConnection();

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
