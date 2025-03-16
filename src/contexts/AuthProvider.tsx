import {User} from "../utils/types";
import {createContext, ReactNode, useEffect, useState} from "react";
import {getReq} from "../utils/axios";
import {API, JWT} from "../utils/constants";

type AuthContextType = {
    user: User | null;
    setUser: (newUser: User | null) => void;
};

const defaultValues: AuthContextType = {
    user: null,
    setUser: () => {
    }
};

const AuthContext = createContext<AuthContextType>(defaultValues);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (window.location.pathname.includes("login")) {
            return;
        }

        getReq(API.getCurrentUser).then((response) => {
            if (!response?.data) {
                localStorage.removeItem(JWT);
                window.location.href = window.location.protocol + "//" + window.location.host + "/login"
            }
            setUser(response.data);
        }).catch((e: any) => {
            localStorage.removeItem(JWT);
            console.error("Error getting current user", e);
        })
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext};
