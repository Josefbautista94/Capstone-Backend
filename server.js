import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookmarkRoutes from "./routes/bookmarks.js";
import commentRoutes from "./routes/comments.js";
import connectDB from "./config/db.js";

dotenv.config(); // Loads environment variables from the .env file
const app = express(); // Creates an instance of the Express application

connectDB(); // Connects to MongoDB using the config/db.js setup

app.use(cors()); // Enables Cross-Origin Resource Sharing, allowing the frontend (port 5173) and backend (port 5001) to communicate.
app.use(express.json()); // Tells Express to parse incoming requests with JSON payloads, when the frontend sends data via POST or PUT (like { title: "Crime Report" }), this line ensures req.body contains that data correctly.

//Routes
app.use("/api/bookmarks", bookmarkRoutes); // tells the Express app to use the bookmarkRoutes router whenever a request starts with /api/bookmarks
app.use("/api/comments", commentRoutes); // Same idea, this sets up all the comment-related routes under the path

const PORT = process.env.PORT || 5001; // Sets the port for the server
app.listen(PORT, () => console.log(`The server is running on ${PORT}!`)) // This starts the express server and tells it to listen for incoming HTTP requests