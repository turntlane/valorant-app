import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = inputs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { first_name, last_name, email, password };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const jsonResponse = await response.json();
      localStorage.setItem("token", jsonResponse.token);

      setAuth(true);
    } catch (err) {
      alert("Error adding user");
      console.error(err.message);
    }
  };

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        First Name:
        <input
          name="first_name"
          value={first_name}
          onChange={(e) => handleInput(e)}
        />
        Last Name:
        <input
          name="last_name"
          value={last_name}
          onChange={(e) => handleInput(e)}
        />
        Email:
        <input name="email" value={email} onChange={(e) => handleInput(e)} />
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => handleInput(e)}
        />
        <button type="submit">submit</button>
      </form>
      {/* <Link to="/register">Player Info</Link> */}
    </div>
  );
}

export default Register;
