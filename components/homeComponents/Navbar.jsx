import Link from 'next/link';
import { Hamburger} from '../hamburgers';
import LinkedImage from '../LinkedImage';
import { NavbarStyles } from '../../styles/elements';
import { PageStyles } from '../../styles/pages';
import { NavLinks, ImagesInfo } from '../../constants';

const Navbar = (props) => {

    const getMenuLink = (key, color, text, link, extraClass) => {
        return (
            <Link key={key} href={link}>
                <li className={`${NavbarStyles.menuItem} ${extraClass}`} style={color !== '' ? { color: color } : {}} >{text}</li>
            </Link>
        )
    }

    return (
        <nav className={`${NavbarStyles.nav} ${PageStyles.pagePadding}`}>
            {
                props.screenType === 3 &&
                <div className={NavbarStyles.navEl}>
                    <Hamburger setOpenMenu={props.setOpenMenu} openMenu={props.openMenu} />
                </div>
            }
            <div className={NavbarStyles.navEl}>
                <LinkedImage
                    link={ImagesInfo.logo.link}
                    src={ImagesInfo.logo.src}
                    alt={ImagesInfo.logo.alt}
                    height={ImagesInfo.logo.headerHeight[props.screenType]}
                />
            </div>
            <div className={`${NavbarStyles.navEl} ${NavbarStyles.menu}`}>
                <ul className={NavbarStyles.menuItems} style={props.screenType === 3 ? props.openMenu ?
                    { height: `${(80 * NavLinks.length) + 160}px` } : { height: 0, overflow: 'hidden' } : {}}>
                    {NavLinks.map((nav, i) => (
                        nav.link ? getMenuLink(`menu${i}`, (props.pageInfo.activeMenu == nav.activeKey && props.screenType !== 3) ? 'var(--button-blue-color)' : 'inherit',
                            nav.title, nav.link, '') :
                            <li
                                key={`menu${i}`}
                                className={`${NavbarStyles.menuItem} ${NavbarStyles.expandableMenu}`}
                                style={{
                                    color: (props.pageInfo.activeMenu === nav.activeKey && props.screenType !== 3) ? 'var(--button-blue-color)' : 'inherit',
                                    paddingBottom: props.screenType === 3 ? `calc(${nav.dropdown.length} * var(--navigation-height))` : '0',
                                    height: props.screenType === 3 ? `calc(${nav.dropdown.length} * var(--navigation-height) + 80px)` : 'auto'
                                }}
                            >
                                {nav.title}
                                {
                                    <ul className={NavbarStyles.subMenu} style={props.screenType === 3 ? props.openMenu ?
                                        { height: `120px` } : { height: 0, overflow: 'hidden' } : {}}>
                                        {
                                            nav.dropdown.map((drop, i) => (
                                                getMenuLink(`sub-menu${i}`, '', drop.title, drop.link, props.pageInfo.activeSubMenu === drop.activeKey && props.screenType !== 3 ? NavbarStyles.menuItemActive : '')
                                            ))
                                        }
                                    </ul>
                                }
                            </li>
                    ))}
                </ul>
            </div>
            {
                props.screenType !== 3 && <div className={NavbarStyles.navEl}></div>
            }
            <div className={`${NavbarStyles.navEnd} ${NavbarStyles.navEl}`}>
                <Link href={'/login'} >
                    <button className={NavbarStyles.button}>Log In</button>
                </Link>
                {
                    props.screenType !== 3 && <p>English</p>
                }
            </div>
        </nav >
    )

}

export default Navbar;