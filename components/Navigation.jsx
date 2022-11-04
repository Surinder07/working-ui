import styles from '../styles/Navigation.module.css';
import { navLinks } from '../lib/constants/navLinks';
import Link from 'next/link';

const Navigation = (props) => {

    return (
        <div className={`${styles.nav} pagePadding`} >
            <div className={styles.navLeftContainer} >
                <Link href='/' onClick={() => props.setActiveMenu('home')}>
                    <img src='/logo/Logo.svg' alt="HOME" />
                </Link>
                <ul className={styles.menuItems}>
                    {navLinks.map((nav, i) => (
                        <li
                            key={i}
                            className={`${styles.menuItem} ${styles.navFont}`}
                            style={{ color: props.activeMenu == nav.title ? 'var(--button-blue-color)' : 'inherit' }}
                        >
                            <Link href={nav.link}
                                onClick={() => props.setActiveMenu(nav.title)}
                            >{nav.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.navRightContainer}>
                <div className={`${styles.button} ${styles.navFont}`}>
                    <Link href={'coming-soon'} onClick={() => props.setActiveMenu("login")}>Log In</Link>
                    </div>
                <p>English</p>
            </div>
        </div>
    )
}

export default Navigation;