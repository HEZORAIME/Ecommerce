import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Error connnecting to the MONGODB", error);
        
        
    }
}