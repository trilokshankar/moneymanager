const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Money = require("./money"); 
const User = require("./user");

const app = express();

app.use(cors({
  origin: "https://money-manager-coral.vercel.app/",
  credentials: true
}));
app.use(express.json());

mongoose.connect("mongodb+srv://xyz:123@money.4yejspr.mongodb.net/?retryWrites=true&w=majority&appName=money")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Authentication Routes
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, userId: user._id });
  } else {
    res.status(401).json({ success: false, message: "User not found" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: "User already exists" });
  const newUser = new User({ username, password });
  await newUser.save();
  res.json({ success: true, userId: newUser._id }); 
});

app.post("/forgot-password", async (req, res) => {
  const { username, newPassword } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.password = newPassword;
  await user.save();
  res.json({ success: true, message: "Password updated successfully" });
});

// Expense Routes
app.get("/expenses", async (req, res) => {
  const { userId } = req.query;
  const expenses = await Money.find({ userId });
  res.json(expenses);
});

app.post("/expenses", async (req, res) => {
  const { amount, category, tag, note, userId } = req.body;
  const newExpense = new Money({ amount, category, tag, note, userId });
  await newExpense.save();
  res.json(newExpense);
});

app.put("/expenses/:id", async (req, res) => {
  const expense = await Money.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: "Expense not found" });

  expense.amount = req.body.amount ?? expense.amount;
  expense.category = req.body.category ?? expense.category;
  expense.tag = req.body.tag ?? expense.tag;
  expense.note = req.body.note ?? expense.note;

  await expense.save();
  res.json(expense);
});

app.delete("/expenses/:id", async (req, res) => {
  const expense = await Money.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: "Expense not found" });

  await expense.deleteOne();
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
