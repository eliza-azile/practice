import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Admin: React.FC = () => {
    const { user } = useAuth();

    return (
        <div style={{ padding: '40px', color: 'white' }}>
            <h1>Админ-панель</h1>
            <p>Добро пожаловать, {user?.name}!</p>
            <p>Это защищённая страница для администраторов.</p>
        </div>
    );
};

export default Admin;