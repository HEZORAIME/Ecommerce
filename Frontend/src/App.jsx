import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/userDashboard';
import AdminDashboard from './pages/adminDashboard';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
export default App;