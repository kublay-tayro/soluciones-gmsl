import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange, signOut } from '../services/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar sesión inicial
        const checkUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Error checking user:', error);
            } finally {
                setLoading(false);
            }
        };

        checkUser();

        // Escuchar cambios de autenticación
        const { data: { subscription } } = onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const logout = async () => {
        await signOut();
        setUser(null);
    };

    const value = {
        user,
        loading,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
