import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
    const { user } = useAuth();

    return (
        <div style={{ padding: '40px', color: 'white' }}>
            <h1>Главная страница</h1>
            {user ? (
                <p>Добро пожаловать, {user.name || user.email}!</p>
            ) : (
                <p>Вы не авторизованы. <a href="/login" style={{ color: '#b18cff' }}>Войти</a></p>
            )}
        </div>
    );
};

export default Home;