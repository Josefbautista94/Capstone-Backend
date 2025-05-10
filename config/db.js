import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Loads all environment variables from the .env file into process.env

const connectDB = async () => { // The function that calls server.js to start the DB connection
  try {
    await mongoose.connect(process.env.MONGO_URI); // Tries to connect to your MongoDB database, is asynchronous, so you use await, it grabs the database URI from your .env file
    console.log("✅ MongoDB connected"); // Aye it connected 
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Force-stop app if DB connection fails
  }
};

export default connectDB;