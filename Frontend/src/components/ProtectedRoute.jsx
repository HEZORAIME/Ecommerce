import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import api from "../utils/api";


const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/users/profile");
                if (response.status === 200) { // 200 means success
                    setIsAuthenticated(true); // it sets to true if the user is authenticated
                }
            } catch(error) {
                console.error("Error when checking authentication", error);
                setIsAuthenticated(false); // set to false to check if the user is not authenticated
                navigate("/login"); // Redirect the user to the login page if authentication fails
            }
        };
        checkAuth();
    }, [navigate]);

    // show loading while checking authentication
    if(isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // if authenticated, return the children component so users can access the dashboard(user/admin)
    if (isAuthenticated) {
        return children;
    }

    // if the users are not authenticated,
    //  it will return null meaning it will not render anything(user will be redirected to login page)
    return null;
}

export default ProtectedRoute;