import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../context/CartContext';
import Button from '../UI/Button/Button';
import type { Product } from '../api/products';

interface HomeProps {
    searchTerm?: string;
}

const Home: React.FC<HomeProps> = ({ searchTerm='' }) => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

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
                <h2 style={{ margin: 0, fontSize: '32px', fontWeight: '700px' }}>🔥 Летняя распродажа!</h2>
                <p style={{ margin: '8px 0 0 0' }}>Скидки до 50% на все товары</p>
            </div>

            <div style={{ display: 'flex', gap: '26px', marginTop: '30px', flexWrap: 'wrap' }}>
                {['Электроника', 'Одежда', 'Книги', 'Дом и сад', 'Спорт'].map((category) => (
                    <span key={category} style={{
                        padding: '8px 16px',
                        background: '#222',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }}>
                        {category}
                    </span>
                ))}
            </div>

            <h2 style={{ margin: '100px 0 30px', fontSize: '32px' }}>
                Популярные товары
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '10px'
            }}>
                {filteredProducts.map((product) => (
                    <div key={product.id} style={{
                        background: '#222',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                        <div style={{ fontSize: '48px' }}>{product.image}</div>
                        <h4 style={{ margin: '10px 0 4px 0' }}>{product.name}</h4>
                        <p style={{ color: '#b18cff', fontWeight: 'bold' }}>${product.price}</p>
                        <Button 
                            variant="primary" 
                            size="small"
                            onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                        >
                            В корзину
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;