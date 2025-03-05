import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import contactRoute from "./routes/contactRoutes.js";

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/contact", contactRoute); // Add the contact route here

const PORT = process.env.PORT || 8800;

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log(`Server is running on port ${PORT}!`);
  }
});
