import React, { useEffect, useState } from "react";
import "../styles/App.css";

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
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://money-manager-production-7bea.up.railway.app/expenses/${id}`, {
        method: "DELETE"
      });
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
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
      await fetch(`https://money-manager-production-7bea.up.railway.app/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      setEditId(null);
      fetchExpenses();
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  return (
    <div className="expenses-container">
      <h2>All Expenses</h2>
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
                  ₹{expense.amount} - {expense.category} - {expense.description || "No description"}
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
