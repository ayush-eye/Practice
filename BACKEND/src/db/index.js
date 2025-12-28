import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
    try {
        // Construct connection string properly, handling trailing slashes
        const mongoUri = process.env.MONGODB_URI?.trim();
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        
        const connectionString = mongoUri.endsWith('/') 
            ? `${mongoUri}${DB_NAME}` 
            : `${mongoUri}/${DB_NAME}`;

        const connectionInstance = await mongoose.connect(connectionString);

        console.log(
          `\nMongoDB connected\nDB host : ${connectionInstance.connection.host}`
        );

    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDb;
