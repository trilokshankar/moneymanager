import React, { useState } from "react";

function ForgotPassword({ goBack }) {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await fetch("https://todo-production-c449.up.railway.app/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Password updated successfully");
        goBack(); 
      } else {
        alert(data.message || "Reset failed");
      }
    } catch (error) {
      alert("Reset error: " + error.message);
    }
  };

  return (
    <div className="login-box">
      <h2>Reset Password</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
      <button onClick={goBack}>Back to Login</button>
    </div>
  );
}

export default ForgotPassword;
