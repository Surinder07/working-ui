import Link from "next/link";
import { Hamburger } from "../hamburgers";
import LinkedImage from "../LinkedImage";
import { NavbarStyles } from "../../styles/elements";
import { PageStyles } from "../../styles/pages";
import { NavLinks, logo } from "../../constants";
import { joinClasses } from "../../helpers";
import { useState } from "react";

const Navbar = (props) => {

    const [openMenu, setOpenMenu] = useState(false);

    const getMenuLink = (key, text, link, extraClass) => {
        return (
            <Link key={key} href={link}>
                <li className={joinClasses(NavbarStyles.menuItem, extraClass)} onClick={() => setOpenMenu(false)}>
                    <p>{text}</p>
                </li>
            </Link>
        );
    };

    return (
        <nav className={joinClasses(NavbarStyles.nav, PageStyles.pagePadding)}>
            <div className={joinClasses(NavbarStyles.navEl, NavbarStyles.showMobile)}>
                <Hamburger setOpenMenu={setOpenMenu} openMenu={openMenu} />
            </div>
            <div className={NavbarStyles.navEl}>
                <LinkedImage
                    className={NavbarStyles.logo}
                    link={logo.default.link}
                    src={logo.default.src}
                    alt={logo.default.alt}
                    heightOrient
                    keepQuality
                />
            </div>
            <div className={joinClasses(NavbarStyles.navEl, NavbarStyles.menu, openMenu ? NavbarStyles.openMenu : NavbarStyles.closeMenu)}>
                <LinkedImage
                    className={joinClasses(NavbarStyles.logo, NavbarStyles.showMobile)}
                    link={logo.white.link}
                    src={logo.white.src}
                    alt={logo.white.alt}
                    heightOrient
                    keepQuality
                />
                <ul className={NavbarStyles.menuItems} >
                    {NavLinks.map((nav, i) =>
                        nav.link ? (
                            getMenuLink(`menu${i}`, nav.title, nav.link, props.pageInfo.activeMenu == nav.activeKey && NavbarStyles.activeMenu)
                        ) : (
                            <li
                                key={`menu${i}`}
                                className={joinClasses(NavbarStyles.menuItem, NavbarStyles.expandableMenu, props.pageInfo.activeMenu === nav.activeKey && NavbarStyles.activeMenu)}
                            >
                                <p>{nav.title}</p>
                                {
                                    <ul className={NavbarStyles.subMenu}>
                                        {nav.dropdown.map((drop, i) =>
                                            getMenuLink(
                                                `sub-menu${i}`,
                                                drop.title,
                                                drop.link,
                                                props.pageInfo.activeSubMenu === drop.activeKey && NavbarStyles.menuItemActive
                                            )
                                        )}
                                    </ul>
                                }
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className={joinClasses(NavbarStyles.navEl, NavbarStyles.hideMobile)}></div>
            <div className={joinClasses(NavbarStyles.navEnd, NavbarStyles.navEl)}>
                <Link href={"/login"}>
                    <button className={NavbarStyles.button}>Log In</button>
                </Link>
                <p className={NavbarStyles.hideMobile}>English</p>
            </div>
        </nav>
    );
};

export default Navbar;
