import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';


interface AuthPageProps {
    onAuthSuccess?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitchToRegister = () => {
        setIsLogin(false);
    };

    const handleSwitchToLogin = () => {
        setIsLogin(true);
    };

    const handleLogin = () => {
        console.log('Успешный вход');
        onAuthSuccess?.();
    };

    const handleRegister = () => {
        console.log('Успешная регистрация');
        onAuthSuccess?.();
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#1A1A1A',
                padding: '20px',
            }}
        >
            {isLogin ? (
                <LoginPage
                    onSwitchToRegister={handleSwitchToRegister}
                    onLogin={handleLogin}
                />
            ) : (
                <RegisterPage
                    onSwitchToLogin={handleSwitchToLogin}
                    onRegister={handleRegister}
                />
            )}
        </div>
    );
};

export default AuthPage;