import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUserToken, setCurrentUserToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    // const [isChange, setIsChange] = useState(false)

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const user = await AsyncStorage.getItem("user");
                console.log(token, "from context");

                setCurrentUserToken(token);
                setCurrentUser(user ? JSON.parse(user) : null);
            } catch (error) {
                console.error("Error loading token", error);
            }
        };

        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUserToken, currentUser, setCurrentUserToken, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};