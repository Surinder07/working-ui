import Hamburger from './Hamburger';
import styles from '../styles/elements/Navigation.module.css';
import Link from 'next/link';

const Navigation = (props) => {

    return (
        <div className={styles.nav}>
            <div className={`${styles.bigNav} pagePadding`}>
                <div className={styles.navLeftContainer} >
                    <Link href='/' onClick={() => props.setActiveMenu('home')}>
                        <img src='/logo/Logo.svg' alt="HOME" />
                    </Link>
                    <ul className={styles.menuItems}>
                        {props.navLinks.map((nav, i) => (
                            <Link key={i} href={nav.link} onClick={() => props.setActiveMenu(nav.title)}>
                                <li
                                    className={`${styles.menuItem} ${styles.navFont}`}
                                    style={{ color: props.activeMenu == nav.title ? 'var(--button-blue-color)' : 'inherit' }}
                                >{nav.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className={styles.navRightContainer}>
                    <Link href={'coming-soon'} onClick={() => props.setActiveMenu("login")}>
                        <div className={`${styles.button} ${styles.navFont}`}>Log In</div>
                    </Link>
                    <p>English</p>
                </div>
            </div>
            <div className={styles.smallNavContainer} >
                <ul className={`${props.openMenu ? styles.navMenuMobile : styles.navMenuMobileClose}`}>
                    {props.navLinks.map((nav, i) => (
                        <Link key={i} href={nav.link} onClick={() => {
                            props.setActiveMenu(nav.title);
                            props.setOpenMenu(false);
                        }}>
                            <li
                                className={`${styles.mobileMenuItem} ${styles.navFont}`}
                                style={{
                                    color: props.activeMenu == nav.title ? '#ddd' : 'inherit',
                                    height: `${props.menuHeight}px`
                                }}
                            >
                                {nav.title}
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className={`${styles.smallNav} pagePadding`}>
                    <Hamburger setOpenMenu={props.setOpenMenu} openMenu={props.openMenu} />
                    <Link className={styles.mobileLogo} href='/' onClick={() => {
                        props.setActiveMenu('home');
                        props.setOpenMenu(false);
                    }}>
                        <img src='/logo/Logo.svg' alt="HOME" />
                    </Link>
                    <Link href={'coming-soon'} onClick={() => {
                        props.setActiveMenu("login");
                        props.setOpenMenu(true);
                    }}>
                        <div className={`${styles.button} ${styles.navFont}`}>Log In</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation;