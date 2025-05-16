# 🗽 Capstone-Backend - NYC Crime Tracker

This is the Express + MongoDB backend for the NYC Crime Tracker app. It handles all data related to crime bookmarks and user comments.

---

##  Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Dotenv
- CORS

---

##  Project Structure

- `/config` – MongoDB connection setup
- `/models` – Mongoose schemas (Bookmark, Comment)
- `/routes` – REST API route handlers

---

## API Endpoints

###  Bookmarks

- `POST /api/bookmarks` – Create a new bookmark
- `GET /api/bookmarks` – Fetch all bookmarks
- `PUT /api/bookmarks/:id` – Update a bookmark by ID
- `DELETE /api/bookmarks/:id` – Delete a bookmark by ID

###  Comments

- `POST /api/comments` – Create a new comment
- `GET /api/comments/:area` – Get comments for a specific area
- `PUT /api/comments/:id` – Update a comment by ID
- `DELETE /api/comments/:id` – Delete a comment by ID

---

##  Environment Variables

Create a `.env` file with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

---

##  Notes

- Make sure MongoDB is running or you're connected to MongoDB Atlas
- The frontend for this project is in a separate repository:
  👉 [Capstone Frontend Repo](https://github.com/Josefbautista94/Capstone-Frontend)

---

##  To-Do

- [ ] Add controller files for better route structure
- [ ] Add user auth (optional future feature)
