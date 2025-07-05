import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import Logout from './auth/logout';
import Expenses from './pages/Expenses';
import FilterByTags from './pages/filterbyTags';
import Sidebar from './navbar/sidebar';

function AppLayout() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/' || location.pathname === '/forgot';

  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />}
      <div className={hideSidebar ? 'content-full' : 'content-with-sidebar'}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/filter" element={<FilterByTags />} />
        </Routes>
      </div>
    </div>
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
