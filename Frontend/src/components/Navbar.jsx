import api from '../utils/api';
import { useNavigate } from 'react-router';
export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await api.post("/users/logout")
            navigate("/login")
        } catch(error) {
            console.error("error when logging out", error)
        }
    }
    return (
<div className="flex justify-between items-center p-2">
  <div className="w-1/1"></div>
  
  <div className="w-1/3 flex justify-center">
        <div className="text-2xl font-bold text-white">
            Dashboard
        </div>
  </div>
  
  <div className="w-1/3 flex justify-end">
    <button 
      className="btn btn-primary rounded-sm bg-red-400 text-lg" onClick={handleLogout}>
      Logout
    </button>
  </div>
</div>  

    )
}
