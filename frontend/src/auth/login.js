import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from'ForgotPassword';
import "../styles/login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  // 🔐 Login Function
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const res = await fetch("https://money-manager-production-7bea.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.userId) {
        localStorage.setItem("userId", data.userId);
        navigate("/expenses");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  const handleSignup = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const res = await fetch("https://money-manager-production-7bea.up.railway.app/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.userId) {
        localStorage.setItem("userId", data.userId);
        navigate("/expenses");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Signup error: " + error.message);
    }
  };

  // 🛠 Conditional Reset View
  if (showReset) {
    return <ForgotPassword goBack={() => setShowReset(false)} />;
  }

  // 🧾 Main Login Form
  return (
    <div className="login-box">
      <h2>Login / Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
      <button onClick={() => setShowReset(true)}>Forgot Password?</button>
    </div>
  );
}

export default Login;
