import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (token) => {
        setIsConnected(true);
        setToken(token);
    } 
   
    const logout = () => {
        setUser(false);
        setToken(null);
    }


    return (
        <AuthContext.Provider value={{ user, token, login, logout, isConnected }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook pratique pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);