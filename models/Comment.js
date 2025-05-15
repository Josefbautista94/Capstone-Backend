import mongoose from "mongoose"; // importing mongoose

const CommentSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Comment = mongoose.model("Comment", CommentSchema); // Creating the model, Comment is the name of the model, Mongoose automatically creates a collection named comments in the MongoDB database using this name, It converts "Comment" to lowercase + plural form -> comments
// Second argument CommentSchema is a blueprint that defines what each document should look like

export default Comment;