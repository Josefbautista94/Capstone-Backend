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
    res.status(500).json({ message: "Server error fetching comments. 🙁" });
  }
});

// POST /api/comments
router.post("/", async (req, res) => {

  try {

    const { area, text } = req.body; // Destructures the request body to create local variables for 'area' and 'text', based on the keys sent in the POST request


    // Checks if 'area' and 'text' are present in the request body
    if (!area || !text) {
      return res.status(400).json({ message: "Both area and text are required!" }) // If either 'area' or 'text' is missing, return a 400 error

    }

    const newComment = new Comment({ area, text }); // using the comment mongoose model to create a new comment object
    const savedComment = await newComment.save(); // Saving the new comment to the DB

    res.status(201).json(savedComment) // the post was created 👍🏼 returns the saved comment in JSON format

  }
  catch (err) {
    console.error("😓 Error creating comment:", err);
    res.status(500).json({ message: "Server error creating comment 🤯" })
  }
})

// PUT /api/comments/:id
router.put("/:id", async (req, res) => {

  try {
    const { id } = req.params // Extracts/pulling the comment ID from the URL
    const { area, text } = req.body // Updates the field from the body

    // This will check if at least one field is provided
    if (!area && !text) {
      return res.status(400).json({ message: "You at least have to provide one field! Either area or field!" })
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,               // Telling MONGO to go find the comment with this specific _id value and update it.
      { area, text },  // Only update the fields that are defined, this can be partial
      { new: true }   // Returns the updated document otherwise without this it would return the old one
    );

    if (!updatedComment) { // If mongoDB doesnt find a document to edit we return this;
      return res.status(404).json({ message: "The comment was not found!" })
    }

    res.status(200).json(updatedComment) // Respond with the updated comment

  } catch (err) {
    console.error("😓 There was an error trying to update the comment:", err)
    res.status(500).json({ message: "There was a server error updating the comment 🫤" })
  }

})

// DELETE /api/comments/:id
router.delete("/:id", async (req, res) => {

  try {
    const { id } = req.params; // Extract the comment ID from the URL

    const deletedComment = await Comment.findByIdAndDelete(id) // Extract the comment ID from the URL

    if (!deletedComment) { // If comment not found
      return res.status(404).json({ message: "The comment wasnt found! There wasn't anything to delete" })
    }

    return res.status(200).json({ message: "The comment was deleted successfully!" })

  } catch (err) {
    console.error("🥲 There was an error trying to deleting the comment", err)
    res.status(500).json({ message: "There was a server error while trying to delete the comment 😓" })
  }

})

//PUT /api/bookmarks/:id
router.put("/:id", async (req, res) => {

  try {


  } catch (err) {
    console.error({ message: "😭 There was an error updating your bookmark:", err })
    res.status(500).json({ message: "Server error updating bookmark." })
  }

})

export default router;