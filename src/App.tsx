import React, { useState } from 'react';
import Button from './UI/Button/Button';
import Input from './UI/Input/Input';
import Select from './UI/Select/Select';
import Checkbox from './UI/Checkbox/Checkbox';
import Toggle from './UI/Toggle/Toggle';
import Modal from './UI/Modal/Modal';
import Navigation from './UI/Navigation/Navigation';
import AuthPage from './pages/AuthPage';

function App() {
    const [currentPage, setCurrentPage] = useState<'auth' | 'main'>('auth');

    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [agreed, setAgreed] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    const [parentChecked, setParentChecked] = useState(false);
    const [child1Checked, setChild1Checked] = useState(false);
    const [child2Checked, setChild2Checked] = useState(false);

    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const allChecked = child1Checked && child2Checked;
    const someChecked = child1Checked || child2Checked;

    const handleParentChange = (checked: boolean) => {
        setParentChecked(checked);
        setChild1Checked(checked);
        setChild2Checked(checked);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handleLogin = () => {
        console.log('Вход выполнен');
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        console.log('Товар удалён');
        setIsConfirmModalOpen(false);
    };

    const handleAuthSuccess = () => {
        setCurrentPage('main');
    };

    const handleLogout = () => {
        setCurrentPage('auth');
    };

    const cityOptions = [
        { label: 'Москва', value: 'msk' },
        { label: 'Санкт-Петербург', value: 'spb' },
        { label: 'Новосибирск', value: 'nsk' },
        { label: 'Екатеринбург', value: 'ekb' },
        { label: 'Казань', value: 'kzn' },
    ];

    const emailState = email.includes('@') && email.length > 0
        ? 'success'
        : email.length > 0
            ? 'error'
            : undefined;

    const passwordState = password.length >= 6
        ? 'success'
        : password.length > 0
            ? 'error'
            : undefined;

    const cityState = selectedCity ? 'success' : undefined;

    const SearchIcon = () => (
        <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19.9167 19.9167L18 18M9.85417 18.9583C11.0497 18.9583 12.2336 18.7228 13.3382 18.2653C14.4427 17.8078 15.4464 17.1372 16.2918 16.2918C17.1372 15.4464 17.8078 14.4427 18.2653 13.3382C18.7228 12.2336 18.9583 11.0497 18.9583 9.85417C18.9583 8.65859 18.7228 7.47472 18.2653 6.37015C17.8078 5.26558 17.1372 4.26195 16.2918 3.41655C15.4464 2.57115 14.4427 1.90054 13.3382 1.44301C12.2336 0.985486 11.0497 0.75 9.85417 0.75C7.43959 0.75 5.12391 1.70919 3.41655 3.41655C1.70919 5.12391 0.75 7.43959 0.75 9.85417C0.75 12.2687 1.70919 14.5844 3.41655 16.2918C5.12391 17.9991 7.43959 18.9583 9.85417 18.9583V18.9583Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    if (currentPage === 'auth') {
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
    }

    return (
        <div
            style={{
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                backgroundColor: '#1A1A1A',
                minHeight: '100vh',
                color: 'white',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0 }}>Мой UI Kit</h1>
                <Button variant="secondary" onClick={handleLogout}>
                    Выйти
                </Button>
            </div>

            <Navigation
                logo="Shop"
                links={[
                    { label: 'Главная', href: '#', active: true },
                    { label: 'Каталог', href: '#' },
                    { label: 'О нас', href: '#' },
                    { label: 'Контакты', href: '#' },
                ]}
                search={
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Input
                            placeholder="Поиск..."
                            size="small"
                            style={{ padding: '11px 15px' }}
                        />
                        <span
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '55%',
                                transform: 'translateY(-50%)',
                                color: 'rgba(255,255,255,0.3)',
                                fontSize: '16px',
                                pointerEvents: 'none',
                            }}
                        >
                            <SearchIcon />
                        </span>
                    </div>
                }
            />

            <div>
                <h2>Кнопки</h2>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="danger">Danger</Button>
                </div>
            </div>

            <div>
                <h2>Поля ввода</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        maxWidth: '500px',
                    }}
                >
                    <Input
                        label="Имя"
                        placeholder="Введите ваше имя"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <Input
                        type="email"
                        label="Email"
                        placeholder="example@mail.ru"
                        value={email}
                        onChange={handleEmailChange}
                        state={emailState}
                        stateText={
                            emailState === 'error'
                                ? 'Введите корректный email'
                                : emailState === 'success'
                                    ? 'Email принят'
                                    : ''
                        }
                        required
                    />

                    <Input
                        label="Пароль"
                        type="password"
                        placeholder="Введите пароль (мин. 6 символов)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        state={passwordState}
                        stateText={
                            passwordState === 'error'
                                ? 'Пароль должен содержать минимум 6 символов'
                                : passwordState === 'success'
                                    ? 'Надёжный пароль'
                                    : ''
                        }
                        size="large"
                    />

                    <Input
                        label="Отключенное поле"
                        placeholder="Недоступно"
                        disabled
                    />

                    <Input
                        label="Предупреждение"
                        placeholder="Это поле с предупреждением"
                        state="warning"
                        stateText="Обратите внимание на это поле"
                    />

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Input placeholder="Small" size="small" />
                        <Input placeholder="Medium" size="medium" />
                        <Input placeholder="Large" size="large" />
                    </div>
                </div>
            </div>

            <div>
                <h2>Выпадающие списки</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        maxWidth: '500px',
                    }}
                >
                    <Select
                        label="Город"
                        placeholder="Выберите город"
                        options={cityOptions}
                        value={selectedCity}
                        onChange={setSelectedCity}
                        state={cityState}
                        stateText={
                            selectedCity
                                ? 'Город выбран'
                                : 'Выберите город из списка'
                        }
                    />

                    <Select
                        label="С предупреждением"
                        placeholder="Выберите что-то"
                        options={cityOptions}
                        state="warning"
                        stateText="Проверьте правильность выбора"
                    />

                    <Select
                        label="С ошибкой"
                        placeholder="Выберите город"
                        options={cityOptions}
                        state="error"
                        stateText="Это поле обязательно для заполнения"
                    />

                    <Select
                        label="Успешно"
                        placeholder="Выберите город"
                        options={cityOptions}
                        value="msk"
                        state="success"
                        stateText="Город успешно выбран"
                    />

                    <Select
                        label="Отключённый"
                        placeholder="Недоступно"
                        options={cityOptions}
                        disabled
                    />
                </div>
            </div>

            <div>
                <h2>Чекбоксы</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        maxWidth: '500px',
                    }}
                >
                    <Checkbox
                        label="Я согласен с условиями"
                        checked={agreed}
                        onChange={setAgreed}
                    />

                    <Checkbox
                        label="Подписаться на рассылку"
                        checked={newsletter}
                        onChange={setNewsletter}
                    />

                    <Checkbox
                        label="Отключенный (не выбран)"
                        checked={false}
                        disabled
                    />

                    <Checkbox
                        label="Отключенный (выбран)"
                        checked={true}
                        disabled
                    />

                    <h3 style={{ fontSize: '16px', color: '#BCBCBC', margin: '8px 0 0 0' }}>
                        Промежуточное состояние
                    </h3>

                    <Checkbox
                        label="Выбрать все"
                        checked={parentChecked}
                        onChange={handleParentChange}
                        indeterminate={someChecked && !allChecked}
                    />

                    <div
                        style={{
                            paddingLeft: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <Checkbox
                            label="Опция 1"
                            checked={child1Checked}
                            onChange={setChild1Checked}
                        />
                        <Checkbox
                            label="Опция 2"
                            checked={child2Checked}
                            onChange={setChild2Checked}
                        />
                    </div>
                </div>
            </div>

            <div>
                <h2>Переключатели (Toggle)</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        maxWidth: '500px',
                    }}
                >
                    <Toggle
                        label="Уведомления"
                        checked={notifications}
                        onChange={setNotifications}
                    />

                    <Toggle
                        label="Тёмная тема"
                        checked={darkMode}
                        onChange={setDarkMode}
                    />

                    <Toggle
                        label="Отключенный (вкл)"
                        checked={true}
                        disabled
                    />

                    <Toggle
                        label="Отключенный (выкл)"
                        checked={false}
                        disabled
                    />
                </div>
            </div>

            <div>
                <h2>Модальные окна</h2>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Открыть модалку
                </Button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Вход в систему"
                confirmText="Войти"
                onConfirm={handleLogin}
            >
                <Input
                    label="Email"
                    placeholder="example@mail.ru"
                    type="email"
                />
                <Input
                    label="Пароль"
                    placeholder="Введите пароль"
                    type="password"
                />
                <Checkbox label="Запомнить меня" />
            </Modal>

            <Modal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="Подтверждение удаления"
                confirmText="Удалить"
                cancelText="Отмена"
                onConfirm={handleDelete}
                size="small"
            >
                <p style={{ margin: 0 }}>
                    Вы уверены, что хотите удалить этот товар?
                    Это действие нельзя отменить.
                </p>
            </Modal>
        </div>
    );
}

export default App;