import React from 'react';
import styles from './Input.module.css';


interface InputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
    size?: 'small' | 'medium' | 'large';
    state?: 'error' | 'success' | 'warning';
    stateText?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    name?: string;
    style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder = 'Введите текст...',
    type = 'text',
    size = 'medium',
    state,
    stateText ='',
    label,
    required = false,
    disabled = false,
    className = '',
    name,
    style,
    ...rest
}) => {
    const isError = state === 'error';
    const isSuccess = state === 'success';
    const isWarning = state === 'warning';

    const containerClass = [
        styles.container,
        isError ? styles.error : '',
        isSuccess ? styles.success : '',
        isWarning ? styles.warning : '',
        disabled ? styles.disabled : '',
        className,
    ].filter(Boolean).join(' ');

    const inputClass = [
        styles.input,
        styles[size],
        isError ? styles.inputError : '',
        isSuccess ? styles.inputSuccess : '',
        isWarning ? styles.inputWarning : '',
    ].filter(Boolean).join(' ');

    const stateTextClass = isError ? styles.errorText : isSuccess ? styles.successText : isWarning ? styles.warningText : '';

    return (
        <div className={containerClass}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            <input
                type={type}
                className={inputClass}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                name={name}
                style={style}
                {...rest}
            />

            {stateText && (
                <span className={`${styles.stateText} ${stateTextClass}`}>
                    {stateText}
                </span>
            )}
        </div>
    );
};

export default Input;