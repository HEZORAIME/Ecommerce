import Navbar from "../components/Navbar";
import AdminProducts from "../components/AdminProducts";
import Orb from "./Orb";

export default function AdminDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 -z-10">
        <Orb hue={-10} hoverIntensity={0.25} />
      </div>
      <div className="relative container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm p-6">
          <AdminProducts />
        </div>
      </div>
    </div>
  );
}
