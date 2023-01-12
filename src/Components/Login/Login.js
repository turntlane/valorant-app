import React, { useState } from "react";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const jsonResponse = await response.json();
      localStorage.setItem("token", jsonResponse.token);
      console.log(jsonResponse);
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

export default Login;
