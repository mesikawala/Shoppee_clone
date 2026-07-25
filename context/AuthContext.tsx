"use client"

import {createContext, useContext, useEffect, useState, ReactNode} from "react";

interface User {
    id: string,
    username: string,
    email: string,
    role: string,
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    getMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const getMe = async() => {
        try {
            const res = await fetch("/api/auth/me")

            if (!res.ok) {
                setUser(null)
                return
            };

            const data = await res.json();
            setUser(data.user)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getMe()
    }, []);

    return (
        <AuthContext.Provider
        value={{
            user,
            loading,
            getMe,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth harus di pakai di dalam AuthProvider")
    }
    return context;
}