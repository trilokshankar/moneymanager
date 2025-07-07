import "./sidebar.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>Money Manager</h2>
      <nav>
        <Link to="/all-expenses">All Expenses</Link>
        <Link to="/expenses">Add Expense</Link>
        <Link to="/filter">Filter by Category</Link>
        <Link to="/distribution">Track your expenses</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
    </div>
  );
}

export default Sidebar;
