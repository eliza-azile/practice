import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../UI/Button/Button';

const Home: React.FC = () => {
    const { user } = useAuth();

    const products = [
        { id: 1, name: 'Ноутбук', price: 999, image: '💻' },
        { id: 2, name: 'Смартфон', price: 599, image: '📱' },
        { id: 3, name: 'Наушники', price: 199, image: '🎧' },
        { id: 4, name: 'Клавиатура', price: 89, image: '⌨️' },
    ];

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>🛒 Интернет-магазин</h1>
                {user ? (
                    <p>👋 Добро пожаловать, <strong>{user.name || user.email}</strong>!</p>
                ) : (
                    <Button variant="secondary" onClick={() => window.location.href = '/login'}>
                        Войти
                    </Button>
                )}
            </div>

            <div style={{
                background: 'linear-gradient(135deg, #712eff, #b18cff)',
                padding: '40px',
                borderRadius: '16px',
                marginTop: '20px',
                textAlign: 'center'
            }}>
                <h2 style={{ margin: 0 }}>🔥 Летняя распродажа!</h2>
                <p style={{ margin: '8px 0 0 0' }}>Скидки до 50% на все товары</p>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '30px', flexWrap: 'wrap' }}>
                {['Электроника', 'Одежда', 'Книги', 'Дом и сад', 'Спорт'].map((category) => (
                    <span key={category} style={{
                        padding: '8px 16px',
                        background: '#222',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>
                        {category}
                    </span>
                ))}
            </div>

            <h2 style={{ marginTop: '30px' }}>Популярные товары</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '10px'
            }}>
                {products.map((product) => (
                    <div key={product.id} style={{
                        background: '#222',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        transition: 'transform 0.2s'
                    }}>
                        <div style={{ fontSize: '48px' }}>{product.image}</div>
                        <h4 style={{ margin: '10px 0 4px 0' }}>{product.name}</h4>
                        <p style={{ color: '#b18cff', fontWeight: 'bold' }}>${product.price}</p>
                        <Button variant="primary" size="small">В корзину</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;