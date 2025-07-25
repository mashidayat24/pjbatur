import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "batur" && password === "Kejajar@52205") {
      onLogin();
    } else {
      setErr("Username atau Password salah.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login Admin</button>
      </form>
      {err && <div className="login-error">{err}</div>}
    </div>
  );
}

export default Login;