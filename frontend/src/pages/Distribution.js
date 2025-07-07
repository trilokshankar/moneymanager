import React, { useState, useEffect } from "react";

function Distribution() {
  const [expenses, setExpenses] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [distribution, setDistribution] = useState({});
  const userId = localStorage.getItem("userId");

  const fetchExpenses = async () => {
    if (!fromDate || !toDate) return;

    try {
      const res = await fetch(
        `https://money-manager-production-7bea.up.railway.app/expenses?userId=${userId}`
      );
      const data = await res.json();

      const filtered = data.filter((exp) => {
        const expDate = new Date(exp.date || exp.createdAt);
        return (
          expDate >= new Date(fromDate) &&
          expDate <= new Date(toDate)
        );
      });

      const categoryTotals = {};
      filtered.forEach((exp) => {
        const cat = exp.category;
        const amt = Number(exp.amount);
        categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
      });

      setExpenses(filtered);
      setDistribution(categoryTotals);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchExpenses();
    }
  }, [fromDate, toDate]);

  return (
    <div className="distribution-container">
      <h2>Expense Distribution</h2>

      <div className="date-filter">
        <label>From: </label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label>To: </label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {Object.keys(distribution).length > 0 ? (
        <ul>
          {Object.entries(distribution).map(([category, total]) => (
            <li key={category}>
              <strong>{category}</strong>: ₹{total}
            </li>
          ))}
        </ul>
      ) : (
        fromDate &&
        toDate && <p>No expenses found in the selected range.</p>
      )}
    </div>
  );
}

export default Distribution;
