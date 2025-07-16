import { useState } from "react";
import api from '../utils/api';
import {Link} from "react-router"

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/register', {username, password, email});
            if (response.status === 200) {
                window.location.href = '/login';
            } else {
                setError('Registration failed',error);
            }
        } catch (error) {
            console.error("Error registering user", error)
            return error.status(500).json({massage: "Internal server error"});
        }
        if (!username || !password || !email) {
            setError("Please fill all the");
            return;
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">
                Username:
                <input  placeholder="Username" type="username" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label htmlFor="">
                Email:
                <input  placeholder="Please Enter email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" placeholder="Enter your password" value={password} onChange={e =>setPassword(e.target.value)}/>
            </label>
            <button type="submit">Register</button>
            <p>
                Already have account? <Link to = "/login">Login</Link>
            </p>
            {error && <p>{error}</p>}
        </form>
    )
}
