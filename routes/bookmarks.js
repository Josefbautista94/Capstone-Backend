import express from "express";
import Bookmark from "../models/Bookmark.js";
const router = express.Router();

router.get("/", async (req, res) => {

  try {
    const bookmarks = await Bookmark.find() // Fetch all bookmarks from the database

    res.status(200).json(bookmarks) // Return them as JSON



  } catch (err) {
    console.error("😓 There was an error fetching the bookmarks:", err)
    res.status(500).json({ message: "Server error fetching bookmarks. 🙁" })
  }


});

// POST /api/bookmarks
router.post("/", async (req, res) => {
  try {
    const { // Destructure fields from the incoming request body to create:

      cmplntNum, // Stuff like: "302014252",
      boroNm,    // Stuff like:  "BRONX"
      ofnsDesc,  // Stuff like: "ROBBERY"
      lawCatCd,  // Stuff like: "FELONY"
      pdDesc,    // Stuff like: "GRAND LARCENY"
      latitude,  // Stuff like:  40.824
      longitude, // Stuff like: -73.911,
      notes      // Stuff like: "Saw this on the news"

    } = req.body;

    //Check required fields
    if (!cmplntNum || !boroNm || !ofnsDesc || !latitude || !longitude) { // Ensure all essential fields are provided: cmplntNum for ID, boroNm and ofnsDesc for context, and latitude/longitude for map location
      return res.status(400).json({ message: "Missing one of the required bookmark fields!" });
    }

    const newBookmark = new Bookmark({ // Create a new Bookmark instance using those unpacked variables up there to build a Mongoose document.
      // That document follows the structure of the BookmarkSchema — it's not a plain object, it's a full Mongoose model instance
      cmplntNum,
      boroNm,
      ofnsDesc,
      lawCatCd,
      pdDesc,
      latitude,
      longitude,
      notes

    });

    const savedBookmark = await newBookmark.save(); // Here we're saving the mongoose schema

    res.status(201).json(savedBookmark); // returns the savedBookmark in JSON format

  } catch (err) {
    if (err.code === 11000) { // MongoDB gives a special error code 11000 when you try to insert a duplicate value into a field marked as unique, if the error code is 11000, it means a bookmark with the same cmplntNum already exists (duplicate key violation)
      // Returning a cleaner, more accurate message to the user
      return res.status(409).json({ message: "This crime has already been bookmarked." }); // Status for something that violates uniqueness or conflicts with existing data.
    }
    console.error("😓 There was an error saving the bookmark:", err) // if a non 11000 error occurs
    res.status(500).json({ message: "There was a server error saving the bookmark. 😭" });
  }


})

export default router;