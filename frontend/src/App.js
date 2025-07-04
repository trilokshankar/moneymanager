import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/login';
import Logout from './auth/logout';
import ForgotPassword from './auth/Forgotpassword';
import Navbar from './navbar/navbar';
import Expenses from './pages/expenses';
import FilterByTag from './pages/filterbyTag';
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
        <Route path="/filter" element={<FilterByTag />} />
      </Routes>
    </Router>
  );
}

export default App;
