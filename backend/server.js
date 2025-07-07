const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Money = require("./money");
const User = require("./user");

const app = express();

app.use(cors({
  origin: "https://money-manager-coral.vercel.app",
  credentials: true
}));
app.use(express.json());

mongoose.connect("mongodb+srv://xyz:123@money.4yejspr.mongodb.net/?retryWrites=true&w=majority&appName=money")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

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

app.get("/expenses", async (req, res) => {
  const { userId, from, to } = req.query;
  const query = { userId };
  if (from && to) {
    query.date = {
      $gte: new Date(from),
      $lte: new Date(to)
    };
  }
  const expenses = await Money.find(query);
  res.json(expenses);
});

app.post("/expenses", async (req, res) => {
  const { amount, category, tag, description, userId, date } = req.body;
  const newExpense = new Money({
    amount,
    category,
    tag,
    description,
    userId,
    date: date ? new Date(date) : new Date()
  });
  await newExpense.save();
  res.json(newExpense);
});

app.put("/expenses/:id", async (req, res) => {
  const expense = await Money.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  expense.amount = req.body.amount ?? expense.amount;
  expense.category = req.body.category ?? expense.category;
  expense.tag = req.body.tag ?? expense.tag;
  expense.description = req.body.description ?? expense.description;
  await expense.save();
  res.json(expense);
});

app.delete("/expenses/:id", async (req, res) => {
  const expense = await Money.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  await expense.deleteOne();
  res.json({ success: true });
});

app.get("/filter", async (req, res) => {
  const { userId, category } = req.query;
  if (!userId || !category) {
    return res.status(400).json({ message: "Missing userId or category" });
  }
  try {
    const expenses = await Money.find({
      userId,
      category: { $regex: new RegExp(category, "i") }
    });
    res.json(expenses);
  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
