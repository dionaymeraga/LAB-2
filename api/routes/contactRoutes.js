import express from "express";
import db from "../mysql/db.js";

const router = express.Router();

// Route to handle form submission
router.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  // SQL query to insert form data into the "messages" table
  const query = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  // Insert the data into the table
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting message into MySQL:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error saving message" });
    }

    // If successful, send a success response
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  });
});

export default router;
