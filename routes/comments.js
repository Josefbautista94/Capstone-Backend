import express from "express";
import Comment from "../models/Comment.js";
const router = express.Router();

// GET /api/comments/:area
router.get("/:area", async (req, res) => {

  try {
    const area = req.params.area; // Extracts the area value from the URL (e.g., 'bronx' in /api/comments/bronx)

    //Find comments that match this area ()
    const comments = await Comment.find({// Finds all comment documents in MongoDB where the 'area' field matches the value from the URL
      area: { $regex: new RegExp(`^${area}$`, "i") } // Uses a regex to match the area exactly, case-insensitive 
      // .find({ area: ... }) : telling MongoDB, find all documents where the area field matches somethin
      // The $regex is a MongoDB operator that says :I don’t want to match the area exactly I want to match it using a pattern 
      // This is that pattern :  new RegExp(`^${area}$`, "i"), new RegExp(...), is the JavaScript way to create a regex.
      // ^ -> must start with, $ -> must end with, ,"i" -> case-insensitive put all these together -> "Match exactly, no matter the casing
    })
    res.status(200).json(comments); // Sends the matching comments as a JSON response with a 200 OK status
  }
  catch (err) {
    console.error("😓 There was an error fetching the comments:", err);
    res.status(500).json({ message: "Server error fetching comments." });
  }
});


export default router;