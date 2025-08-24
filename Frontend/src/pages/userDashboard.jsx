import Navbar from '../components/Navbar'
import Orb from './Orb'
// import UserProducts from '../components/UserProduct'
//<UserProducts />
export default function UserDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="bg-violet-700/10 p-6 border-none shadow-none">
        <Navbar />
      </div>

      <div className="absolute inset-0 -z-10">
        <Orb hue={-10} hoverIntensity={0.25} />
      </div>
      <div className="relative container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">User Dashboard</h1>
      </div>
    </div>
  );
}