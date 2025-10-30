import { connectDB } from './config/Database.js';
import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js'
import cookieParser from 'cookie-parser';
import ProductRoute from './routes/ProductRoute.js';
import CartRoute from './routes/CartRoute.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


// api routes
app.use("/api/users", UserRoute);
app.use("/api/products", ProductRoute);
app.use("/api/cart", CartRoute);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port", PORT);
    });
});