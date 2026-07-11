import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Checkbox from '../UI/Checkbox/Checkbox';
import Select from '../UI/Select/Select';


interface RegisterPageProps {
    onSwitchToLogin?: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({onSwitchToLogin
}) => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [agreed, setAgreed] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [agreeError, setAgreeError] = useState(false);

    const cityOptions = [
        { label: 'Москва', value: 'msk' },
        { label: 'Санкт-Петербург', value: 'spb' },
        { label: 'Новосибирск', value: 'nsk' },
        { label: 'Екатеринбург', value: 'ekb' },
        { label: 'Казань', value: 'kzn' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        if (name.length < 2) {
            setNameError(true);
            hasError = true;
        } else {
            setNameError(false);
        }

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

        if (!agreed) {
            setAgreeError(true);
            hasError = true;
        } else {
            setAgreeError(false);
        }

        if (hasError) return;
    
        login(email, password);
        navigate('/');
    };

    return (
        <div className="auth-card">
            <h2 className="auth-title">Регистрация</h2>

            <form onSubmit={handleSubmit} className="auth-form">
                <Input
                    label="Имя"
                    type="text"
                    placeholder="Введите ваше имя"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setNameError(false);
                    }}
                    state={nameError ? 'error' : undefined}
                    stateText={nameError ? 'Имя должно содержать минимум 2 символа' : ''}
                    required
                />

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

                <Input
                    label="Подтверждение пароля"
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmError(false);
                    }}
                    state={confirmError ? 'error' : undefined}
                    stateText={confirmError ? 'Пароли не совпадают' : ''}
                    required
                />

                <Select
                    label="Город"
                    placeholder="Выберите город"
                    options={cityOptions}
                    value={city}
                    onChange={setCity}
                />

                <div>
                    <Checkbox
                        label="Я принимаю условия пользовательского соглашения"
                        checked={agreed}
                        onChange={(checked) => {
                            setAgreed(checked);
                            if (checked) setAgreeError(false);
                        }}
                    />
                    {agreeError && (
                        <p style={{ color: '#ff2430', fontSize: '14px', margin: '4px 0 0 32px' }}>
                            Необходимо принять условия
                        </p>
                    )}
                </div>

                <Button variant="primary" type="submit" size="large" className="auth-button">
                    Зарегистрироваться
                </Button>

                <p className="auth-switch">
                    Уже есть аккаунт?{' '}
                    <span onClick={onSwitchToLogin}>
                        Войти
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

export default RegisterPage;