import Navbar from '../components/Navbar'
import UserProducts from '../components/UserProduct'

export default function UserDashboard() {
  return (
    <div>
     <Navbar/>
     <h1 className='text-3xl font-bold text-center my-8'>User dashboard</h1>
     <UserProducts/>
    </div>
  );
}
