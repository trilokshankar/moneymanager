import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import Logout from './auth/logout';
import ForgotPassword from './auth/Forgotpassword';
import Navbar from './navbar/navbar';
import Expenses from './pages/expenses';
import FilterByTags from './pages/filterbyTags';
import './styles/App.css';

function AppLayout() {
  const location = useLocation();
  const hideNavbarOn = ['/', '/forgot']; 

  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
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
      <AppLayout />
    </Router>
  );
}

export default App;
