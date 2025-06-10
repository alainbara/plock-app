import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const login = (connexionData) => {
        //TODD : mettre des verifs correctes sur les infos de connexion
        setIsConnected(true);
        setToken(connexionData.token);
        setUser(connexionData.username);
        navigate("/mainScreen")
    } 
   
    const logout = () => {
        setUser(false);
        setToken(null);
        setIsConnected(false);
        navigate("/");
    }


    return (
        <AuthContext.Provider value={{ user, token, login, logout, isConnected }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook pratique pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);