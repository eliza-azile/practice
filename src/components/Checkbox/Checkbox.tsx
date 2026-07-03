import React from 'react';
import { type InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';


interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' > {
    checked?: boolean;
    onChange?: (checked:boolean) => void;
    label?: string;
    indeterminate?: boolean;
    disabled?: boolean;
    className?: string; 
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked = false,
    onChange,
    label,
    indeterminate = false,
    disabled = false,
    className = '',
    id,
    ...rest

}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
    };

    const containerClass = [
        styles.container,
        className,
    ].filter(Boolean).join(' ');

    const checkboxClass = [
        styles.checkbox,
        checked ? styles.checked : '',
        indeterminate ? styles.indeterminate : '',
        disabled ? styles.disabled : '',
    ].filter(Boolean).join(' ');


    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={containerClass}>
            <div className={styles.wrapper}>
                <input
                    ref={inputRef}
                    id={checkboxId}
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    className={styles.hiddenInput}
                    {...rest}
                />
                <label htmlFor={checkboxId} className={checkboxClass}>
                    <span className={styles.customCheckbox}>
                        {checked && !indeterminate && (
                            <svg width="7" height="5" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                        {indeterminate && (
                            <svg width="7" height="5" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="13" height="1" rx="0.5" fill="white"/>
                            </svg>
                        )}
                    </span>
                    {label && <span className={styles.label}>{label}</span>}
                </label>
            </div>
        </div>
    );
};

export default Checkbox;