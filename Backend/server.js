require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  tasks: {
    pending: [{ id: Number, name: String, time: String }],
    ongoing: [{ id: Number, name: String, time: String }],
    completed: [{ id: Number, name: String, time: String }],
  },
});
const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "All fields are required" });

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    tasks: { pending: [], ongoing: [], completed: [] },
  });

  await newUser.save();
  res.json({ message: "Signup successful" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token, tasks: user.tasks });
});

// Middleware to authenticate user
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) throw new Error();
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Get User Tasks
app.get("/tasks", authMiddleware, (req, res) => {
  res.json(req.user.tasks);
});

// Add Task
app.post("/tasks", authMiddleware, async (req, res) => {
  const { section, name } = req.body;
  const newTask = { id: Date.now(), name, time: "0:00:00" };
  req.user.tasks[section].push(newTask);
  await req.user.save();
  res.json(req.user.tasks);
});

// Move Task
app.put("/tasks/move", authMiddleware, async (req, res) => {
  const { taskId, from, to } = req.body;
  const taskIndex = req.user.tasks[from].findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return res.status(400).json({ error: "Task not found" });

  const task = req.user.tasks[from].splice(taskIndex, 1)[0];
  req.user.tasks[to].push(task);
  await req.user.save();
  res.json(req.user.tasks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
