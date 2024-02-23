import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Waiting for DB to connect
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MONGODB!!")
        
    } catch (error) {
        console.log("MONGODB connection error", error);
        throw error;
    }
}

export default connectDB;