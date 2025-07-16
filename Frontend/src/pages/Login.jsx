import { useState } from "react";
import api from "../utils/api";
import { Link, useNavigate } from "react-router";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      console.log(response.data);
      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (response.data.role === "users") {
        navigate("/dashboard");
      } else {
        setError("Invalid Role");
        console.log(error);
        return;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>
      <label>
        Password:
        <input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>
      <button type="submit" className="btn btn-primary rounded-full bg-black text-white w-40 h-8">
        Login
      </button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
