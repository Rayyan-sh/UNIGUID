import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import UserModel from "./Models/UserModel.js";
import CourseModel from "./Models/CourseModel.js";
import BookModel from "./Models/BookModel.js";
import CommentModel from "./Models/CommentModel.js";
import * as ENV from "./config.js"; //Environment Variables


const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// DB CONNECTION 
//const connectString =
  //"mongodb+srv://76s2129_db_user:76s2129@cluster0.1p7xxwj.mongodb.net/?appName=Cluster0";
  // using Environment Variables
const connectString = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(connectString).then(() => {
  console.log("MongoDB Connected");
  console.log("DB NAME:", mongoose.connection.name);
  // for testing
  console.log("DB_USER:", ENV.DB_USER);
console.log("DB_PASSWORD:", ENV.DB_PASSWORD);
  
});

// to find collection from DB
mongoose.connection.once("open", async () => {
  const collections = await mongoose.connection.db
    .listCollections()
    .toArray();

  console.log("COLLECTIONS:", collections.map(c => c.name));
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});



//  REGISTER
app.post("/registerUser", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      gender: req.body.gender, 
    });

    console.log("SAVED USER:", user);

    res.send({ user, msg: "User created" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//  LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ error: "Invalid credentials" });

    res.send({ user, msg: "Success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  UPDATE PROFILE
app.put("/updateUserProfile/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { name, password, gender } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (gender) {
      user.gender = gender; 
    }

    await user.save();

    res.send({ user, msg: "Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// GET COURSES
app.get("/courses", async (req, res) => {
  try {
    const courses = await CourseModel.find({});
    res.send({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// GET BOOKS BY COURSE
app.get("/books/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    const books = await BookModel.find({
      courseId: courseId.trim(),
    });

    res.send({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a BOOK
app.get("/books/:bookId", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.bookId);
    res.send({ book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD COMMENT
app.post("/comments", async (req, res) => {
  try {
    const { commentBody, bookId, userId } = req.body;

    const comment = await CommentModel.create({
      commentBody,
      bookId,
      userId,
    });

    res.send({ comment });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// GET COMMENTS BY BOOK
app.get("/comments/book/:bookId", async (req, res) => {
  try {
    const comments = await CommentModel.find({
      bookId: req.params.bookId,
    }).populate("userId", "name");


    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// LIKE / DISLIKE COMMENT
app.put("/comments/react/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, type } = req.body;

    const comment = await CommentModel.findById(commentId);

    if (!comment)
      return res.status(404).json({ msg: "Comment not found" });

    if (type === "like") {
      if (comment.likes.includes(userId)) {
        comment.likes.pull(userId);
      } else {
        comment.likes.push(userId);
        comment.dislikes.pull(userId);
      }
    }

    if (type === "dislike") {
      if (comment.dislikes.includes(userId)) {
        comment.dislikes.pull(userId);
      } else {
        comment.dislikes.push(userId);
        comment.likes.pull(userId);
      }
    }

    await comment.save();

    res.send({ comment });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});