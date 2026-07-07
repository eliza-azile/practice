import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ padding: '40px', color: 'white' }}>
            <h1>Личный кабинет</h1>
            <p>Имя: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Роль: {user?.role}</p>
            <button onClick={handleLogout} style={{ 
                padding: '8px 16px', 
                background: '#ff2430', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer'
            }}>
                Выйти
            </button>
        </div>
    );
};

export default Profile;