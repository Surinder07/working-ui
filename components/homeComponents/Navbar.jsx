import Link from 'next/link';
import Hamburger from '../hamburgers/Hamburger';
import LinkedImage from '../LinkedImage';
import styles from '../../styles/elements/Navbar.module.css';
import pageStyles from '../../styles/Pages.module.css';
import { NavLinks } from '../../constants';
import { ImagesInfo } from '../../constants/ImagesInfo';

const Navbar = (props) => {

    const getMenuLink = (key, color, text, link, extraClass) => {
        return (
            <Link key={key} href={link}>
                <li className={`${styles.menuItem} ${extraClass}`} style={color !== '' ? { color: color } : {}} >{text}</li>
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
                        nav.link ? getMenuLink(`menu${i}`, (props.pageInfo.activeMenu == nav.activeKey && props.screenType !== 3) ? 'var(--button-blue-color)' : 'inherit',
                            nav.title, nav.link, '') :
                            <li
                                key={`menu${i}`}
                                className={`${styles.menuItem} ${styles.expandableMenu}`}
                                style={{
                                    color: (props.pageInfo.activeMenu === nav.activeKey && props.screenType !== 3) ? 'var(--button-blue-color)' : 'inherit',
                                    paddingBottom: props.screenType === 3 ? `calc(${nav.dropdown.length} * var(--navigation-height))` : '0',
                                    height: props.screenType === 3 ? `calc(${nav.dropdown.length} * var(--navigation-height) + 80px)` : 'auto'
                                }}
                            >
                                {nav.title}
                                {
                                    <ul className={styles.subMenu} style={props.screenType === 3 ? props.openMenu ?
                                        { height: `120px` } : { height: 0, overflow: 'hidden' } : {}}>
                                        {
                                            nav.dropdown.map((drop, i) => (
                                                getMenuLink(`sub-menu${i}`, '', drop.title, drop.link, props.pageInfo.activeSubMenu === drop.activeKey && props.screenType !== 3 ? styles.menuItemActive: '')
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
                {/* <Link href={'login'} > */}
                    <button disabled className={styles.button}>Log In</button>
                {/* </Link> */}
                {
                    props.screenType !== 3 && <p>English</p>
                }
            </div>
        </nav >
    )

}

export default Navbar;