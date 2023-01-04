const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { SERVER_PORT } = process.env;

const {
  seed,
  getAllPosts,
  createPost,
  deletePost,
  getComments,
} = require("./controller");
// const { userLogin, userSignup } = require("./authController");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/seed", seed);

app.get("/api/posts", getAllPosts);
app.post("/api/addPost", createPost);
app.delete("/deletePost/:id", deletePost);
app.get("/api/comments", getComments);

// app.post("/api/login", userLogin);

// app.post("/api/signUp", userSignup);

app.listen(SERVER_PORT, () => console.log("Listening on port ${SERVER_PORT}"));
