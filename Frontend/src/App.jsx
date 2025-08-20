import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App;
