import React, { useState } from "react";
import "../styles/App.css";

function FilterByCategory() {
  const [category, setCategory] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const userId = localStorage.getItem("userId");

  const handleFilter = async () => {
    if (!category) {
      alert("Enter a category to filter by.");
      return;
    }

    try {
      const res = await fetch(`https://money-manager-production-7bea.up.railway.app/filter?userId=${userId}&category=${category}`);
      const data = await res.json();

      if (res.ok) {
        setFilteredExpenses(data);
      } else {
        alert("Failed to filter expenses.");
      }
    } catch (err) {
      console.error("Error fetching filtered data:", err);
      alert("Error fetching filtered data.");
    }
  };

  return (
    <div className="filter-container">
      <h2>Filter Expenses by Category</h2>
      <div className="filter-form">
        <input
          type="text"
          placeholder="Enter Category (e.g. food)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      <h3>Results:</h3>
      <ul className="filtered-list">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((exp, index) => (
            <li key={index}>
              ₹{exp.amount} - {exp.category} - {exp.description|| "No description"}
            </li>
          ))
        ) : (
          <p>No results found for this category.</p>
        )}
      </ul>
    </div>
  );
}

export default FilterByCategory;
