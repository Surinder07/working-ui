import Link from 'next/link';
import Hamburger from './Hamburger';
import LinkedImage from './LinkedImage';
import styles from '../styles/elements/Navbar.module.css';
import pageStyles from '../styles/Pages.module.css';
import { NavLinks } from '../constants';
import { ImagesInfo } from '../constants/ImagesInfo';
import { userService } from '../services/user.service';
import { useEffect, useState } from 'react';

const Navbar = (props) => {

    const [showSubMenu, setShowSubMenu] = useState(false);

    useEffect(() => {
        setShowSubMenu(props.screenType === 3 ? true : false);
    }, [props.screenType])

    const getMenuLink = (key, color, text, link) => {
        return (
            <Link key={key} href={link}>
                <li className={styles.menuItem} style={{ color: color }} >{text}</li>
            </Link>
        )
    }

    return (
        <nav className={`${styles.nav} ${pageStyles.pagePadding}`}>
            {
                props.screenType === 3 &&
                <div className={styles.navEl}>
                    <Hamburger setOpenMenu={props.setOpenMenu} openMenu={props.openMenu} />
                </div>
            }
            <div className={styles.navEl}>
                <LinkedImage
                    link={ImagesInfo.logo.link}
                    src={ImagesInfo.logo.src}
                    alt={ImagesInfo.logo.alt}
                    height={ImagesInfo.logo.headerHeight[props.screenType]}
                />
            </div>
            <div className={`${styles.navEl} ${styles.menu}`}>
                <ul className={styles.menuItems} style={props.screenType === 3 ? props.openMenu ?
                    { height: `${(80 * NavLinks.length) + 160}px` } : { height: 0, overflow: 'hidden' } : {}}>
                    {NavLinks.map((nav, i) => (
                        nav.link ? getMenuLink(`menu${i}`, (props.activeMenu == nav.title && props.screenType !== 3) ? 'var(--button-blue-color)' : 'inherit',
                            nav.title, nav.link) :
                            <li
                                key={`menu${i}`}
                                className={`${styles.menuItem} ${styles.expandableMenu}`}
                                style={{
                                    color: (props.activeMenu == nav.title && props.screenType !== 3) ? 'var(--button-blue-color)' : 'inherit',
                                    paddingBottom: props.screenType === 3 ? `calc(${nav.dropdown.length} * var(--navigation-height))` : '0',
                                    height: props.screenType === 3 ? `calc(${nav.dropdown.length} * var(--navigation-height) + 80px)` : 'auto'
                                }}
                                onMouseEnter={() => { if (props.screenType !== 3) setShowSubMenu(true) }}
                                onMouseLeave={() => { if (props.screenType !== 3) setShowSubMenu(false) }}
                            >
                                {nav.title}
                                {
                                    showSubMenu &&
                                    <ul className={styles.subMenu}>
                                        {
                                            nav.dropdown.map((drop, i) => (
                                                getMenuLink(`sub-menu${i}`, 'inherit', drop.title, drop.link)
                                            ))
                                        }
                                    </ul>
                                }
                            </li>
                    ))}
                </ul>
            </div>
            {
                props.screenType !== 3 && <div className={styles.navEl}></div>
            }
            <div className={`${styles.navEnd} ${styles.navEl}`}>
                {
                    (props.showLogin || !(props.user && props.user.email)) ?
                        <>
                            <Link href={'login'} >
                                <button className={styles.button}>Log In</button>
                            </Link>
                            {
                                props.screenType !== 3 && <p>English</p>
                            }
                        </> :
                        <button className={styles.button} onClick={() => userService.logout()}>Log Out</button>
                }
            </div>
        </nav >
    )

}

export default Navbar;