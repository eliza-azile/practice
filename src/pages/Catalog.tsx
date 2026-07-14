import React, { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import { productsApi } from '../api/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../api/products';

interface CatalogProps {
    searchTerm?: string;
}

const Catalog: React.FC<CatalogProps> = ({ searchTerm = '' }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        productsApi.getAll().then(data => {
            setProducts(data);
            setLoading(false);
        }).catch(error => {
            console.error('Ошибка загрузки товаров:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div style={{ padding: '40px', color: 'white' }}>Загрузка...</div>;
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '40px', margin: '0 auto', color: 'white' }}>
            <h1>Каталог товаров</h1>

            {searchTerm && (
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Результаты поиска: <strong>"{searchTerm}"</strong>
                </p>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                {filteredProducts.map((product) => (
                    <div key={product.id} style={{
                        background: '#222',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        transition: 'transform 0.2s'
                    }}>
                        <div style={{ fontSize: '48px' }}>{product.image}</div>
                        <h4 style={{ margin:'10px 0 4px 0' }}>{product.name}</h4>
                        <p style={{ color: '#b18cff', fontWeight: 'bold' }}>${product.price}</p>
                        <Button 
                            variant='primary' 
                            size='small'
                            onClick={() => addToCart(product)}
                        >
                            В корзину
                        </Button>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: '40px' }}>
                    Товаров не найдено
                </p>
            )}
        </div>
    );
};

export default Catalog;