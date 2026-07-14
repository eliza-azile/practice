import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../UI/Button/Button";


const Cart: React.FC = () => {
    const { cartItems, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

    const handleCheckout = () => {
        alert('🎉 Спасибо за заказ! В ближайшее время с вами свяжется менеджер.');
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: 'white', textAlign: 'center' }}>
                <h1>🛒 Корзина</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginBottom: '15px' }}>
                    Ваша корзина пуста
                </p>
                <Link to="/catalog">
                    <Button variant="primary">Перейти в каталог</Button>
                </Link>
            </div>
        );
    }

    return (
         <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', color: 'white' }}>
            <h1>🛒 Корзина</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                Всего товаров: <strong>{totalItems}</strong>
            </p>

            <div style={{ marginTop: '20px' }}>
                {cartItems.map((item) => (
                    <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '16px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                    }}>
                        <div style={{ fontSize: '36px' }}>{item.image}</div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0 }}>{item.name}</h4>
                            <p style={{ color: '#b18cff', margin: '4px 0 0 0' }}>
                                ${item.price} × {item.quantity}
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#222',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <div>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Итого:</span>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '12px' }}>
                        ${totalPrice}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button variant="secondary" size="small" onClick={clearCart}>
                        Очистить корзину
                    </Button>
                    <Button variant="primary" size="small" onClick={handleCheckout}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;