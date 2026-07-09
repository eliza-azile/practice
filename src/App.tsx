import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

import Navigation from './UI/Navigation/Navigation';
import Button from './UI/Button/Button';

function AppContent() {
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
                            🛒 Корзина
                        </Button>
                    </Link>
                }
            />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />

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
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;