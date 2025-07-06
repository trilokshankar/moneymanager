import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Money Manager</h2>
      <nav>
        <Link to="/expenses">Add Expense</Link>
        <Link to="/filter">Filter by Tags</Link>
        <Link to="/all-expenses">All Expenses</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
