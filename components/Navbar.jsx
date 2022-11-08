import Link from 'next/link';
import Hamburger from './Hamburger';
import LinkedImage from './LinkedImage';
import styles from '../styles/elements/Navbar.module.css';
import { ImagesInfo } from '../lib/constants/ImagesInfo';

const Navbar = (props) => {

    return (
        <nav className={styles.nav}>
            <div className={`${styles.bigNav} pagePadding`}>
                <div className={styles.navEl}>
                    <LinkedImage
                        link={ImagesInfo.logo.link}
                        src={ImagesInfo.logo.src}
                        alt={ImagesInfo.logo.alt}
                        height={ImagesInfo.logo.headerHeight[props.screenType]}
                        onClick={() => props.setActiveMenu('/')}
                    />
                </div>
                <div className={styles.navEl}>
                    <ul className={styles.menuItems} style={{justifyContent: 'flex-start', marginLeft:'20px'}}>
                        {props.navLinks.map((nav, i) => (
                            <Link key={i} href={nav.link} onClick={() => props.setActiveMenu(nav.title)}>
                                <li
                                    className={styles.menuItem}
                                    style={{ color: props.activeMenu == nav.title ? 'var(--button-blue-color)' : 'inherit' }}
                                >{nav.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div></div>
                <div className={`${styles.navEnd} ${styles.navEl}`}>
                    <Link href={'coming-soon'} onClick={() => props.setActiveMenu("login")}>
                        <button disabled style={{color: '#999', cursor:'default'}} className={styles.button}>Log In</button>
                    </Link>
                    <p>English</p>
                </div>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
                <ul className={`${props.openMenu ? styles.navMenuMobile : styles.navMenuMobileClose}`}>
                    {props.navLinks.map((nav, i) => (
                        <Link key={i} href={nav.link} onClick={() => {
                            props.setActiveMenu(nav.title);
                            props.setOpenMenu(false);
                        }}>
                            <li
                                className={styles.mobileMenuItem}
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
                    <div className={styles.navEl}>
                        <LinkedImage
                            link={ImagesInfo.logo.link}
                            src={ImagesInfo.logo.src}
                            alt={ImagesInfo.logo.alt}
                            height={ImagesInfo.logo.headerHeight[props.screenType]}
                            onClick={() => props.setActiveMenu('/')}
                        />
                    </div>
                    <div className={`${styles.navEnd} ${styles.navEl}`}>
                        <Link href={'coming-soon'} onClick={() => props.setActiveMenu("login")}>
                            <button disabled className={styles.button}>Log In</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )

}

export default Navbar;