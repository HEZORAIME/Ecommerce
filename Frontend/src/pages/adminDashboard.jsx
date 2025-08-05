import Navbar from "../components/Navbar";
import AdminProducts from "../components/AdminProducts";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">Admin Dashboard</h1>
        <AdminProducts />
      </div>
    </div>
  );
}
