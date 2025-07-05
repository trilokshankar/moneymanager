import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Logout from './auth/logout';
import ForgotPassword from './auth/ForgotPassword';
import Navbar from './navbar/navbar';
import Expenses from './pages/expenses';
import FilterByTags from './pages/filterbyTags';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/filter" element={<FilterByTags />} />
      </Routes>
    </Router>
  );
}

export default App;
