import { useState } from "react";
import api from "../utils/api";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      console.log(response.data);
      if (response.data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (response.data.role === "users") {
        window.location.href = "/dashboard";
      } else {
        setError("Invalid Role")
        console.log(error)
        return;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    // redirect based on role
  };
  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}