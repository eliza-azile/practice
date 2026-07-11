import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Toggle from '../UI/Toggle/Toggle';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const orders = [
        { id: 1, date: '15.07.2026', total: 1599, status: 'Доставлен' },
        { id: 2, date: '10.07.2026', total: 299, status: 'В пути' },
        { id: 3, date: '05.07.2026', total: 89, status: 'Ожидает оплаты' },
    ];

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', color: 'white' }}>
            <h1>Личный кабинет</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '30px',
                marginTop: '80px'
            }}>

                <div style={{
                    background: '#222',
                    padding: '24px',
                    borderRadius: '12px',
                    alignSelf: 'start'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#b18cff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        margin: '0 auto 16px'
                    }}>
                        {user?.name?.[0] || '👤'}
                    </div>
                    <h3 style={{ textAlign: 'center', margin: '0' }}>
                        {user?.name}
                    </h3>
                    <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)', margin: '4px 0 0 0' }}>
                        {user?.email}
                    </p>
                    <p style={{ textAlign: 'center', margin: '4px 0 20px 0' }}>
                        Роль: {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}
                    </p>

                    <Button variant="danger" size="small" onClick={handleLogout}>
                        Выйти
                    </Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Заказы */}
                    <div style={{ background: '#222', padding: '20px', borderRadius: '12px' }}>
                        <h3 style={{ margin: '0 0 16px 0' }}>📦 История заказов</h3>

                        {orders.length > 0 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                gap: '12px 16px',
                                padding: '8px 0'
                            }}>
                                {/* Заголовки */}
                                <span style={{ fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                                    Заказ
                                </span>
                                <span style={{ fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                                    Дата
                                </span>
                                <span style={{ fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                                    Сумма
                                </span>
                                <span style={{ fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                                    Статус
                                </span>

                                {/* Данные */}
                                {orders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <span>Заказ №{order.id}</span>
                                        <span>{order.date}</span>
                                        <span>${order.total}</span>
                                        <span style={{
                                            color: order.status === 'Доставлен' ? '#34c759' :
                                                   order.status === 'В пути' ? '#ffb763' : '#ff2430'
                                        }}>
                                            {order.status}
                                        </span>
                                    </React.Fragment>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'rgba(255,255,255,0.4)' }}>У вас пока нет заказов</p>
                        )}
                    </div>

                    <div style={{ background: '#222', padding: '20px', borderRadius: '12px' }}>
                        <h3 style={{ margin: '0 0 16px 0' }}>⚙️ Настройки</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Toggle label="Уведомления по email" checked={true} onChange={() => {}} />
                            <Toggle label="Тёмная тема" checked={true} onChange={() => {}} />
                            <Toggle label="Автосохранение" checked={false} onChange={() => {}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;