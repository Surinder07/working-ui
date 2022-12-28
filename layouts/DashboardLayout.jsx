import {useRef, useEffect, useState, useCallback} from "react";
import Link from "next/link";
import { ProfileImage, NotificationBell, SearchBar, LinkedImage, ConstantHamburger, Hamburger } from "../components";
import { footerIcons, SideNavInfo } from "../constants";
import { LogoWhite, FaviconWhite, Favicon, Logo } from "../public/images";
import { DashboardLayout } from "../styles/layouts";
import { Logout, Settings, PlayArrow, Stop  } from "@mui/icons-material";
import { userService } from "../services";

const Dashboard = (props) => {
    const sideNavRef = useRef();

    const [y, setY] = useState(window.scrollY);
    const [sideNavStyle, setSideNavStyle] = useState({});
    const [navOpen, setNavOpen] = useState(props.screenType === 3 ? false : true);
    const [userName, setUserName] = useState("...");
    const [sideNav, setSideNav] = useState([]);
    const [play,setPlay] = useState(false)
    const handleNavigation = useCallback(
        (e) => {
            const window = e.currentTarget;
            if (sideNavRef.current.clientHeight > window.scrollY + window.innerHeight) {
                setSideNavStyle({});
            } else if (y < window.scrollY && sideNavRef.current.clientHeight < window.scrollY + window.innerHeight) {
                setSideNavStyle({position: "fixed", bottom: 0});
            }
            setY(window.scrollY);
        },
        [y]
    );

    useEffect(() => {
        if (props.user.role) {
            setUserName(props.user ? props.user.firstName + (props.user.lastName ? " " + props.user.lastName : "") : "");
            setSideNav(SideNavInfo[props.user.role.toLowerCase()]);
        }
    }, [props.user]);

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <div className={`${DashboardLayout.dashboardPage} ${navOpen ? DashboardLayout.openNavDashboard : DashboardLayout.closeNavDashboard}`}>
            <div style={{position: "relative", width: "inherit"}}>
                <div className={DashboardLayout.sideNav} ref={sideNavRef} style={sideNavStyle}>
                    <div>
                        <div>
                            <div style={{margin: "0 auto", width: "fit-content"}} className={DashboardLayout.logoContainer}>
                                <LinkedImage src={navOpen ? LogoWhite : FaviconWhite} className={DashboardLayout.logo} alt="Logo" link="/dashboard" />
                            </div>
                            <p className={DashboardLayout.version}>Version: {process.env.version}</p>
                            {props.screenType === 3 && (
                                <div className={DashboardLayout.profileContainer}>
                                    <p>Hi, John Ferdinand</p>
                                    <ProfileImage size={"small"} header />
                                </div>
                            )}
                            {props.screenType === 3 && <SearchBar className={DashboardLayout.searchBar} setValue={console.log} placeholder="Search" search darkTheme />}
                            {props.screenType === 3 && (
                                <div className={DashboardLayout.sideNavHam}>
                                    <Hamburger setOpenMenu={setNavOpen} openMenu={navOpen} />
                                </div>
                            )}
                        </div>
                        <div style={{marginTop: "20px"}}>
                            {props.user.role ? (
                                sideNav.map((info, key) => (
                                    <Link href={info.link} key={key}>
                                        <div
                                            className={`${DashboardLayout.menuItem} ${info.activeKey === props.pageInfo.activeMenu ? DashboardLayout.activeMenuItem : ""}`}
                                            style={navOpen ? {} : {margin: "auto", width: "100%"}}
                                        >
                                            {info.icon}
                                            {navOpen && <p style={{marginLeft: "10px"}}>{info.text}</p>}
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className={DashboardLayout.menuItem}>Loading...</div>
                            )}
                        </div>
                    </div>
                    <div style={{height: "80px"}}></div>
                    <div>
                        <Link href="/dashboard/settings">
                            <div className={`${DashboardLayout.menuItem} ${props.pageInfo.activeMenu === "SETTINGS" ? DashboardLayout.activeMenuItem : ""}`}>
                                <Settings style={{fontSize: "16px"}} />
                                {navOpen && <p style={{marginLeft: "10px"}}>Settings</p>}
                            </div>
                        </Link>
                        <div className={`${DashboardLayout.menuItem}`} onClick={() => userService.logout()}>
                            <Logout style={{fontSize: "16px"}} />
                            {navOpen && <p style={{marginLeft: "10px"}}>Logout</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${navOpen ? DashboardLayout.openNavRightContainer : DashboardLayout.closeNavRightContainer}`}>
                <div className={DashboardLayout.header}>
                    <ConstantHamburger setOpen={setNavOpen} open={navOpen} />
                    {props.screenType !== 3 && <div className={DashboardLayout.clockDashboardMain}>
                            <div>
                             <p>Clock In</p>
                             <p style={{color: '#2996C3'}}>10:00</p>
                            </div>
                            <div>
                            <p>Clock Out</p>
                             <p style={{color: '#2996C3'}}>05:00</p>
                            </div>
                            <div>
                           { !play? <PlayArrow className={DashboardLayout.playAndPauseIcon} onClick={()=> setPlay(true)}/> : <Stop className={DashboardLayout.playAndPauseIcon} onClick={()=> setPlay(false)} />}
                            </div>
                            </div>}
                    <div className={DashboardLayout.headerRight}>
                        {props.screenType !== 3 && <SearchBar className={DashboardLayout.searchBar} setValue={console.log} placeholder="Search" search />}
                        <div className={DashboardLayout.helpIcon}>?</div>
                        <NotificationBell />
                        {props.screenType !== 3 && <h3 className={DashboardLayout.userName}>{userName}</h3>}
                        {props.screenType !== 3 && <ProfileImage size={"small"} header />}
                    </div>
                    {props.screenType === 3 && (
                        <div style={{width: "fit-content"}}>
                            <LinkedImage src={Logo} width={160} alt="Logo" link="/dashboard" />
                        </div>
                    )}
                </div>
                <div className={DashboardLayout.content}>{props.children}</div>
                <div className={DashboardLayout.footer}>
                    <div className={DashboardLayout.leftContainer}>
                        <p style={{marginRight: "20px"}}>&#169;{` ${new Date().getFullYear()} WAAW GLOBAL INC. All Rights Reserved`}</p>
                        {footerIcons.socialIcons.map((icon, i) => (
                            <LinkedImage className={DashboardLayout.footerIcons} key={`social_${i}`} heightOrient src={icon.src} alt={icon.alt} link={icon.link} />
                        ))}
                    </div>
                    <LinkedImage className={DashboardLayout.footerLogo} src={Favicon} heightOrient alt="WAAW" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
