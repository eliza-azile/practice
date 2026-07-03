import React, { useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Select from './components/Select/Select';
import Checkbox from './components/Checkbox/Checkbox';
import Toggle from './components/Toggle/Toggle'; // ← импорт Toggle

function App() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Состояния для чекбоксов
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [parentChecked, setParentChecked] = useState(false);
  const [child1Checked, setChild1Checked] = useState(false);
  const [child2Checked, setChild2Checked] = useState(false);

  // Состояния для toggle
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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

  const cityOptions = [
    { label: 'Москва', value: 'msk' },
    { label: 'Санкт-Петербург', value: 'spb' },
    { label: 'Новосибирск', value: 'nsk' },
    { label: 'Екатеринбург', value: 'ekb' },
    { label: 'Казань', value: 'kzn' },
  ];

  const emailState = email.includes('@') && email.length > 0 ? 'success' : email.length > 0 ? 'error' : undefined;
  const passwordState = password.length >= 6 ? 'success' : password.length > 0 ? 'error' : undefined;
  const cityState = selectedCity ? 'success' : undefined;

  return (
    <div style={{ 
      padding: '40px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '30px',
      backgroundColor: '#1A1A1A',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>Мой UI Kit</h1>

      {/* Кнопки */}
      <div>
        <h2>Кнопки</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      {/* Inputs */}
      <div>
        <h2>Поля ввода</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
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
            stateText={emailState === 'error' ? 'Введите корректный email' : emailState === 'success' ? 'Email принят' : ''}
            required
          />

          <Input
            label="Пароль"
            type="password"
            placeholder="Введите пароль (мин. 6 символов)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            state={passwordState}
            stateText={passwordState === 'error' ? 'Пароль должен содержать минимум 6 символов' : passwordState === 'success' ? 'Надёжный пароль' : ''}
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

      {/* Selects */}
      <div>
        <h2>Выпадающие списки</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
          <Select
            label="Город"
            placeholder="Выберите город"
            options={cityOptions}
            value={selectedCity}
            onChange={setSelectedCity}
            state={cityState}
            stateText={selectedCity ? 'Город выбран' : 'Выберите город из списка'}
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

      {/* Checkboxes */}
      <div>
        <h2>Чекбоксы</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
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

          <div style={{ paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

      {/* Toggles */}
      <div>
        <h2>Переключатели (Toggle)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
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
    </div>
  );
}

export default App;