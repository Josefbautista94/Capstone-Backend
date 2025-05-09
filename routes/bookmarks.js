import express from "express";
const router = express.Router();

// example route
router.get("/", (req, res) => {
  res.send("Bookmarks route working!");
});

export default router; 