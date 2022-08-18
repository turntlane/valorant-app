import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      // e.preventDefault()
      let FormData = {
        first_name,
        last_name,
        email,
        password,
      };
      await axios.post("http://localhost:5000/auth/register", FormData);
      alert("user created");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("Error adding user");
      console.error(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        First Name:
        <input onChange={(e) => setFirstName(e.target.value)} />
        Last Name:
        <input onChange={(e) => setLastName(e.target.value)} />
        Email:
        <input onChange={(e) => setEmail(e.target.value)} />
        Password:
        <input onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">submit</button>
      </form>
      {/* <Link to="/register">Player Info</Link> */}
    </div>
  );
}

export default Register;
