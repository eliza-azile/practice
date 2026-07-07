import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


interface PrivateRouterProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'user';
}

const PrivateRoute: React.FC<PrivateRouterProps> = ({ children, requiredRole }) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: '#ffffff',
                backgroundColor: '#1A1A1A',
                fontSize: '18px'
            }}>
                Загрузка...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;