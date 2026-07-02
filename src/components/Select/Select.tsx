import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';


export interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    state?: 'error' | 'success' | 'warning';
    stateText?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Выберите...',
    size = 'medium',
    state,
    stateText = '',
    label,
    required = false,
    disabled = false,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const containerRef = useRef<HTMLDivElement>(null);

    const isError = state === 'error';
    const isSuccess = state === 'success';
    const isWarning = state === 'warning';

    useEffect(() => {
        const selected = options.find(opt => opt.value === value);
        setSelectedLabel(selected ? selected.label : '');
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (selectedValue: string) => {
        onChange?.(selectedValue);
        setIsOpen(false);
    };

    const containerClass = [
        styles.container,
        isError ? styles.error : '',
        isSuccess ? styles.success : '',
        isWarning ? styles.warning : '',
        disabled? styles.disabled: '',
        className
    ].filter(Boolean).join(' ');

    const selectClass = [
        styles.select,
        styles[size],
        isOpen ? styles.open: '',
        isError ? styles.selectError : '',
        isSuccess ? styles.selectSuccess : '',
        isWarning ? styles.selectWarning : '',
    ].filter(Boolean).join(' ');

    const stateTextClass = isError ? styles.errorText : isSuccess ? styles.successText : isWarning ? styles.warningText : '';

    return (
        <div className={containerClass} ref={containerRef}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            <div
                className={selectClass}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={selectedLabel ? styles.value : styles.placeholder}>
                    {selectedLabel || placeholder}
                </span>
                <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}></span>
            </div>

            {isOpen && !disabled && (
                <ul className={styles.optionsList}>
                    {options.map((option) => (
                        <li 
                            key={option.value}
                            className={`${styles.option} ${option.value === value ? styles.optionSelected : ''}`}
                            onClick={() => handleSelect(option.value)}
                        > 
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}

            {stateText && (
                <span className={`${styles.stateText} ${stateTextClass}`}>
                    {stateText}
                </span>
            )}
        </div>
    );
};

export default Select;