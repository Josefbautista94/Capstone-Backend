import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors";
import bookmarkRoutes from "./routes/bookmarks.js";
import commentRoutes from "./routes/comments.js";

dotenv.config(); // Loads environment variables from the .env file
const app = express(); // Creates an instance of the Express application

app.use(cors()); // Enables Cross Origin Resource Sharing, Which allows the Frontend(port: 5173) and the Backend(port: 5000) to talk to each other, otherwise it would be blocked by the browser because they're 2 different ports.
app.use(express.json()); // Tells Express to parse incoming requests with JSON payloads, when the frontend sends data via POST or PUT (like { title: "Crime Report" }), this line ensures req.body contains that data correctly.

//Routes
app.use("/api/bookmarks", bookmarkRoutes); // tells the Express app to use the bookmarkRoutes router whenever a request starts with /api/bookmarks
app.use("/api/comments", commentRoutes); // Same idea, this sets up all the comment-related routes under the path

/// MongoDB Connection
mongoose.connect(process.env.MONGO_URI) // Connets the app to the mongoDB database, using the connection string stored in the .env file
    .then(() => console.log("MongoDB connected")) // If the database connects successfully, it prints this message
    .catch((err) => console.error("DB error:", err)); // If the connection fails, wrong URI, no internet, ect. this shows

    const PORT = process.env.PORT || 5001; // Sets the port for the server
    app.listen(PORT, () => console.log(`The server is running on ${PORT}!`)) // This starts the express server and tells it to listen for incoming HTTP requests