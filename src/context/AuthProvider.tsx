import { createContext , useState } from "react";

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

    const [auth, setAuth] = useState<User>();

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
