import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';

import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Cart from './pages/Cart';


import Navigation from './UI/Navigation/Navigation';
import Button from './UI/Button/Button';
import SearchInput from './components/SearchInput';


function AppContent() {
    const { totalItems } = useCart();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div style={{ backgroundColor: '#1A1A1A', minHeight: '100vh' }}>
            <Navigation
                logo="Shop"
                links={[
                    { label: 'Главная', href: '/', active: true },
                    { label: 'Каталог', href: '/catalog' },
                    { label: 'О нас', href: '/about' },
                    { label: 'Контакты', href: '/contacts' },
                ]}
                search={
                    <SearchInput value={searchTerm} onChange={setSearchTerm} />
                }
                profile={
                    <Link to="/profile">
                        <Button variant="secondary" size="small">
                            👤 Профиль
                        </Button>
                    </Link>
                }
                cart={
                    <Link to="/cart">
                        <Button variant="primary" size="small">
                            🛒 Корзина ({totalItems})
                        </Button>
                    </Link>
                }
            />

            <Routes>
                <Route path="/" element={<Home searchTerm={searchTerm}/>} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route  path="/catalog" element={<Catalog searchTerm={searchTerm} />} />
                <Route path='/about' element={<About />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/cart' element={<Cart />} />


                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <Admin />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;