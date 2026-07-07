import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';


const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

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
                    onSwitchToRegister={() => setIsLogin(false)}
                />
            ) : (
                <RegisterPage
                    onSwitchToLogin={() => setIsLogin(true)}
                />
            )}
        </div>
    );
};

export default AuthPage;