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
        <div>
            <button className='btn btn-primary ' onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}
