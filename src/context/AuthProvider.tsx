import { createContext, useEffect, useState } from 'react';

interface User {
    userid: string;
    role: number;
    firstName: string;
    email: string;
}

interface AuthContextType {
    auth: User;
    setAuth: React.Dispatch<React.SetStateAction<User>>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const localAuth = localStorage.getItem('auth');
                if (localAuth) {
                    const auth = JSON.parse(localAuth);
                    console.log(auth);
                    setAuth(auth);
                }
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);
    return <AuthContext.Provider value={{ auth, setAuth, loading }}>{!loading && children}</AuthContext.Provider>;
};

export default AuthContext;
