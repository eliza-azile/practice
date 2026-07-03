import React from 'react';
import { type InputHTMLAttributes } from 'react';
import styles from './Toggle.module.css';


interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
    checked = false,
    onChange,
    label,
    disabled = false,
    className = '',
    id,
    ...rest
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
    };

    const containerClass = [
        styles.container,
        className,
    ].filter(Boolean).join(' ');

    const toggleClass = [
        styles.toggle,
        checked ? styles.checked : '',
        disabled ? styles.disabled : '',
    ].filter(Boolean).join(' ');

    const toggleId  = id || `toggle-${Math.random().toString(36).substring(2,9)}`;

    return (
        <div className={containerClass}>
            <div className={styles.wrapper}>
                <input 
                    id={toggleId}
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    className={styles.hiddenInput}
                    {...rest}
                />
                <label htmlFor={toggleId} className={toggleClass}>
                    <span className={styles.track}>
                        <span className={styles.thumb} />
                    </span>
                    {label && <span className={styles.label}>{label}</span>}
                </label> 
            </div>
        </div>
    );
};

export default Toggle;
