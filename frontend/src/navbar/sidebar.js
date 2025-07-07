import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Money Manager</h2>
      <nav>
        <Link to="/all-expenses">All Expenses</Link>
        <Link to="/expenses">Add Expense</Link>
        <Link to="/filter">Filter by Category</Link>
        <Link to="/distribution">Track your expenses</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
