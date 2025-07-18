import { useState } from "react";
import api from "../utils/api";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password || !email) {
        setError("Please fill all the fields");
        return;
      }
      const response = await api.post("/users/register", {
        username,
        password,
        email,
        name: username,
      });
      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      } else {
        setError("Registration failed");
      }
      console.log("Registration response status:", response.status);

    } catch (error) {
        if (error.response?.status === 409) {
            setError("Username or email already in use please use another one")
        } else {
            console.error("error registering user", error);
            setError("internal server error");
        }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          placeholder="Username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="">
        Email:
        <input
          placeholder="Please Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Register</button>
      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
      {error && <p>{error}</p>}
    </form>
  );
}
