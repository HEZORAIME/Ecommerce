import { connectDB } from './config/Database';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();



const app = express();
const PORT = process.env.PORT


app.use(express.json());


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port", PORT);
    });
});