import { connectDB } from './config/Database.js';
import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js'
import cookieParser from 'cookie-parser';

dotenv.config();



const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());



// api routes
app.use("/api/users", UserRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port", PORT);
    });
});