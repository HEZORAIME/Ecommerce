import Navbar from '../components/Navbar'
import UserProducts from '../components/UserProduct'

export default function userDashboard() {
  return (
    <div>
     <Navbar/>
     <h1>User dashboard</h1>
     <UserProducts/>
    </div>
  )
}