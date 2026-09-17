import React from "react";
import "./Login.css";

function Login({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-box">

        <h1>Integrated Project Monitoring Platform</h1>

        <p>SIH26103 | MoSPI</p>

        <input
          type="email"
          placeholder="Enter Email"
        />

        <input
          type="password"
          placeholder="Enter Password"
        />

        <button onClick={onLogin}>
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;