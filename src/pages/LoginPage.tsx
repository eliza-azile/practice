import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Checkbox from '../UI/Checkbox/Checkbox';


interface LoginPageProps {
    onSwitchToRegister?: () => void;
    onLogin?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
    onSwitchToRegister,
    onLogin,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        if (!email.includes('@') || email.length === 0) {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }

        if (password.length < 6) {
            setPasswordError(true);
            hasError = true;
        } else {
            setPasswordError(false);
        }

        if (!hasError) {
            console.log('Вход', { email, password, rememberMe });
            onLogin?.();
        }
    };

    return (
        <div className="auth-card">
            <h2 className="auth-title">Вход</h2>

            <form onSubmit={handleSubmit} className="auth-form">
                <Input
                    label="Email"
                    type="email"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(false);
                    }}
                    state={emailError ? 'error' : undefined}
                    stateText={emailError ? 'Введите корректный email' : ''}
                    required
                />

                <Input
                    label="Пароль"
                    type="password"
                    placeholder="Введите пароль (мин. 6 символов)"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
                    }}
                    state={passwordError ? 'error' : undefined}
                    stateText={passwordError ? 'Пароль должен содержать минимум 6 символов' : ''}
                    required
                />

                <div className="auth-options">
                    <Checkbox
                        label="Запомнить меня"
                        checked={rememberMe}
                        onChange={setRememberMe}
                    />
                    <span
                        className="auth-forgot"
                        onClick={() => console.log('Восстановление пароля')}
                    >
                        Забыли пароль?
                    </span>
                </div>

                <Button variant="primary" type="submit" size="large" className="auth-button">
                    Войти
                </Button>

                <p className="auth-switch">
                    Нет аккаунта?{' '}
                    <span onClick={onSwitchToRegister}>
                        Зарегистрироваться
                    </span>
                </p>
            </form>

            <style>{`
                .auth-card {
                    max-width: 420px;
                    width: 100%;
                    background: #222222;
                    border-radius: 16px;
                    padding: 40px 36px;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
                }

                .auth-title {
                    margin: 0 0 4px 0;
                    font-size: 28px;
                    font-weight: 700;
                    color: #ffffff;
                }

                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .auth-options {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: start;
                    gap: 8px;
                }

                .auth-forgot {
                    color: #b18cff;
                    font-size: 14px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .auth-forgot:hover {
                    color: #8a5cff;
                    text-decoration: underline;
                }

                .auth-button {
                    width: 100%;
                    justify-content: center;
                }

                .auth-switch {
                    text-align: center;
                    margin: 0;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 14px;
                }

                .auth-switch span {
                    color: #b18cff;
                    cursor: pointer;
                    font-weight: 500;
                    transition: color 0.2s ease;
                }

                .auth-switch span:hover {
                    color: #8a5cff;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;