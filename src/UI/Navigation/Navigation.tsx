import React from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
    logo?: React.ReactNode;
    links?: Array<{ label: string; href: string; active?: boolean }>;
    search?: React.ReactNode;
    cart?: React.ReactNode;
    profile?: React.ReactNode;
    className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
    logo = 'Магазин',
    links = [
        { label: 'Главная', href: '/', active: true },
        { label: 'Каталог', href: '/catalog' },
        { label: 'О нас', href: '/about' },
        { label: 'Контакты', href: '/contacts' },
    ],
    search,
    cart,
    profile,
    className = '',
}) => {
    const containerClass = [
        styles.navigation,
        className,
    ].filter(Boolean).join(' ');

    return (
        <nav className={containerClass}>
            <div className={styles.container}>
                <div className={styles.logo}>{logo}</div>

                <ul className={styles.links}>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.href}
                                className={`${styles.link} ${link.active ? styles.active : ''}`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {search && <div className={styles.search}>{search}</div>}

                <div className={styles.actions}>
                    {cart && cart}
                    {profile && profile}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;