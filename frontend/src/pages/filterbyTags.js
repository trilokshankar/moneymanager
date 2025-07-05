import React, { useState, useEffect } from "react";
import "../styles/App.css";

function FilterByTags() {
  const [tag, setTag] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const userId = localStorage.getItem("userId");

  const handleFilter = async () => {
    if (!tag) {
      alert("Enter a tag to filter by.");
      return;
    }

    try {
      const res = await fetch(`https://money-manager-production-7bea.up.railway.app/filter?userId=${userId}&tag=${tag}`);
      const data = await res.json();

      if (res.ok) {
        setFilteredExpenses(data);
      } else {
        alert("Failed to filter expenses.");
      }
    } catch (err) {
      alert("Error fetching filtered data.");
    }
  };

  return (
    <div className="filter-container">
      <h2>Filter Expenses by Tag</h2>
      <div className="filter-form">
        <input
          type="text"
          placeholder="Enter Tag (e.g. Food)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      <h3>Results:</h3>
      <ul className="filtered-list">
        {filteredExpenses.map((exp, index) => (
          <li key={index}>
            ₹{exp.amount} - {exp.category} - {exp.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterByTags;
