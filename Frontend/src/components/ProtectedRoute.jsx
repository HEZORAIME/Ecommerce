import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import api from "../utils/api";

const ProtectedRoute = ({ children, requiredRole }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/users/profile");
                if (response.status === 200) {
                    const user = response.data.user;
                    setIsAuthenticated(true);
                    setUserRole(user.role);
                    
                    // Check if user has required role
                    if (requiredRole && user.role !== requiredRole) {
                        console.log(`Access denied. Required: ${requiredRole}, User has: ${user.role}`);
                        // Redirect based on user's actual role
                        if (user.role === 'admin') {
                            navigate("/admin/dashboard");
                        } else {
                            navigate("/dashboard");
                        }
                        return;
                    }
                }
            } catch(error) {
                console.error("Error when checking authentication", error);
                setIsAuthenticated(false);
                navigate("/login");
            }
        };
        checkAuth();
    }, [navigate, requiredRole]);

    // Show loading while checking authentication
    if(isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If authenticated and has correct role, return children
    if (isAuthenticated && (!requiredRole || userRole === requiredRole)) {
        return children;
    }

    // If user doesn't have correct role, return null (they'll be redirected)
    return null;
}

export default ProtectedRoute;