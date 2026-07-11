import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';

const Admin: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [products, setProducts] = useState([
        { id: 1, name: 'Ноутбук', price: 999, category: 'Электроника' },
        { id: 2, name: 'Смартфон', price: 599, category: 'Электроника' },
        { id: 3, name: 'Наушники', price: 199, category: 'Электроника' },
    ]);

    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Электроника' });

    const addProduct = () => {
        if (!newProduct.name || !newProduct.price) return;
        setProducts([...products, {
            id: Date.now(),
            name: newProduct.name,
            price: Number(newProduct.price),
            category: newProduct.category
        }]);
        setNewProduct({ name: '', price: '', category: 'Электроника' });
    };

    const deleteProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div style={{ padding: '40px', margin: '0 auto', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>👑 Админ-панель</h1>
                <Button variant="danger" size="small" onClick={handleLogout}>
                    Выйти
                </Button>
            </div>

            <p style={{ margin: '100px 0 50px', fontSize: '24px' }}>Добро пожаловать, <strong>{user?.name}</strong>!</p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                marginTop: '20px'
            }}>
                <div style={{ background: '#222', padding: '16px', borderRadius: '12px' }}>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)' }}>Товары</p>
                    <p style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0 0' }}>{products.length}</p>
                </div>
                <div style={{ background: '#222', padding: '16px', borderRadius: '12px' }}>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)' }}>Заказы</p>
                    <p style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0 0' }}>1 234</p>
                </div>
                <div style={{ background: '#222', padding: '16px', borderRadius: '12px' }}>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)' }}>Пользователи</p>
                    <p style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0 0' }}>567</p>
                </div>
            </div>

            {/* Управление товарами */}
            <div style={{ background: '#222', padding: '24px', borderRadius: '12px', marginTop: '20px' }}>
                <h3 style={{ margin: '0 0 36px 0', fontSize: '28px', padding: '0 0 22px', borderBottom: '1px solid #ffffff23' }}>📦 Управление товарами</h3>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ flex: '1', minWidth: '150px' }}>
                        <Input
                            placeholder="Название товара"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            size="small"
                        />
                    </div>
                    <div style={{ flex: '0 0 120px' }}>
                        <Input
                            placeholder="Цена"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            size="small"
                        />
                    </div>
                    <div style={{ flex: '0 0 150px' }}>
                        <Select
                            options={[
                                { label: 'Электроника', value: 'Электроника' },
                                { label: 'Одежда', value: 'Одежда' },
                                { label: 'Книги', value: 'Книги' },
                            ]}
                            value={newProduct.category}
                            onChange={(value) => setNewProduct({ ...newProduct, category: value })}
                            size="small"
                        />
                    </div>
                    <Button variant="primary" size="small" onClick={addProduct}>
                        + Добавить
                    </Button>
                </div>

                {/* Список товаров */}
                <div style={{ marginTop: '20px' }}>
                    {products.map((product) => (
                        <div key={product.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '12px 0',
                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <span>{product.name}</span>
                            <span style={{ color: '#b18cff' }}>${product.price}</span>
                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{product.category}</span>
                            <Button
                                variant="danger"
                                size="small"
                                onClick={() => deleteProduct(product.id)}
                            >
                                Удалить
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;