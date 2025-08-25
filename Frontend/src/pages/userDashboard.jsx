import Navbar from '../components/Navbar'
import Orb from './Orb'
// import UserProducts from '../components/UserProduct'
//<UserProducts />
export default function UserDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative bg-violet-700/10 p-6">
        <Navbar />
      </div>

      <div className="absolute inset-7 -z-10">
        <Orb hue={-6} hoverIntensity={0.60} />
      </div>
      <div className="absolute flex justify-center top-96 left-[40%]">
        <button className="bg-violet-700 text-white px-5 py-2 rounded-md">
            Shop
        </button>
      </div>
    </div>
  );
}