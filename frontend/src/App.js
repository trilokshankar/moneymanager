import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './auth/Login.js';
import Logout from './auth/logout';
import ForgotPassword from './auth/ForgotPassword.js';
import Navbar from './navbar/navbar';
import Expenses from './pages/expenses.js';
import FilterByTags from './pages/filterbyTags';
import './styles/App.css';

// Custom wrapper to show/hide Navbar based on route
function AppRoutes() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/forgot'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/filter" element={<FilterByTags />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
