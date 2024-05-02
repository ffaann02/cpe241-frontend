import { createContext , useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

interface User {
    userid: string;
    role: number
    firstName: string;
    email: string;
}

interface AuthContextType {
    auth: User;
    setAuth: React.Dispatch<React.SetStateAction<User>>;
}
  
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    useEffect(()=>{
        console.log("test Auth");
        const fetchUser = async () => {
            try {
                const response = await axiosPrivate.get('/api/user');
                if (response.status === 200) {
                    console.log("is already login")
                }
            } catch (error) {
                console.error('An error occurred while trying to fetch user:', error);
            }
        }
        fetchUser();
    },[])

    const [auth, setAuth] = useState<User>();

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
