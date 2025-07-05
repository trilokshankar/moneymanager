import React, { useState, useEffect } from "react";
import "../styles/App.css"
function Expenses() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`https://money-manager-production-7bea.up.railway.app/expenses?userId=${userId}`);
      const data = await res.json();
      if (res.ok) {
        setExpenses(data);
      } else {
        alert("Failed to fetch expenses");
      }
    } catch (err) {
      alert("Error fetching expenses");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("https://money-manager-production-7bea.up.railway.app/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          amount,
          category,
          description
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Expense added");
        setAmount("");
        setCategory("");
        setDescription("");
        fetchExpenses(); // refresh list
      } else {
        alert(data.message || "Failed to add expense");
      }
    } catch (err) {
      alert("Error submitting expense");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    } else {
      alert("Please login first");
    }
  }, []);

  return (
    <div className="expenses-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category (e.g. Food, Travel)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit Expense</button>
      </form>

      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((exp, index) => (
          <li key={index}>
            ₹{exp.amount} - {exp.category} - {exp.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
