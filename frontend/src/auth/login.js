import { useState } from "react";
import React from "react";
import ForgotPassword from "./Forgotpassword";

function Login({onLogin}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false); 

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const res = await fetch("https://mongodb-production-9fea.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.userId) {
        localStorage.setItem("userId", data.userId);
        onLogin(data.userId);
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
      const res = await fetch("https://todo-production-c449.up.railway.app/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.userId) {
        localStorage.setItem("userId", data.userId);
        onLogin(data.userId);
      } else {
        alert(data.message || "Signup successful. You can now log in.");
      }
    } catch (error) {
      alert("Signup error: " + error.message);
    }
  };

 
  if (showReset) {
    return <ForgotPassword goBack={() => setShowReset(false)} />;
  }

  return (
    <div className="login-box">
      <h2>Login / Signup</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
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
