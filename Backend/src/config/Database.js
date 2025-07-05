import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Error connnecting to the MONGODB", error);
        process.exit(1); // 1 indicates an error occurred it will stop the process
    }
};