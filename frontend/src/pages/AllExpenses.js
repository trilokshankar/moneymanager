import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: ""
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`https://money-manager-production-7bea.up.railway.app/expenses?userId=${userId}`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      alert("Failed to fetch expenses");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://money-manager-production-7bea.up.railway.app/expenses/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("Expense deleted successfully!");
        fetchExpenses();
      } else {
        alert("Failed to delete expense");
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert("Error deleting expense");
    }
  };

  const handleEditClick = (expense) => {
    setEditId(expense._id);
    setFormData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description || ""
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (id) => {
    try {
      const res = await fetch(`https://money-manager-production-7bea.up.railway.app/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Expense updated successfully!");
        setEditId(null);
        fetchExpenses();
      } else {
        alert("Failed to update expense");
      }
    } catch (err) {
      console.error("Error updating expense:", err);
      alert("Error updating expense");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getPieChartData = () => {
    const categoryTotals = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Uncategorized";
      const amount = parseFloat(expense.amount) || 0;
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    });

    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#4a90e2",
            "#f06292",
            "#4db6ac",
            "#ba68c8",
            "#ffb74d",
            "#9575cd",
            "#81c784"
          ],
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div className="expenses-container">
      <h2>All Expenses</h2>

      {/* 🟣 Pie Chart */}
      {expenses.length > 0 && (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <Pie data={getPieChartData()} />
        </div>
      )}

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              {editId === expense._id ? (
                <div>
                  <input
                    name="amount"
                    value={formData.amount}
                    onChange={handleEditChange}
                    type="number"
                  />
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleEditChange}
                    type="text"
                  />
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleEditChange}
                    type="text"
                    placeholder="Description"
                  />
                  <button onClick={() => handleEditSubmit(expense._id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  ₹{expense.amount} - {expense.category} - {expense.description || "No description"} -{" "}
                  <strong>{formatDate(expense.date)}</strong>
                  <button onClick={() => handleEditClick(expense)}>Edit</button>
                  <button onClick={() => handleDelete(expense._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllExpenses;
