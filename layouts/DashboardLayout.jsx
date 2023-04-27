import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ProfileImage, NotificationBell, SearchBar, LinkedImage, ConstantHamburger, Hamburger, FloatingClock, MobileNavigation } from "../components";
import { footerIcons, SideNavInfo } from "../constants";
import { LogoWhite, Favicon, Logo } from "../public/images";
import { DashboardLayout } from "../styles/layouts";
import { Logout, Settings } from "@mui/icons-material";
import { userService } from "../services";
import { joinClasses } from "../helpers";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";

const Dashboard = (props) => {
    const sideNavRef = useRef();

    const [y, setY] = useState(window.scrollY);
    const [sideNavStyle, setSideNavStyle] = useState({});
    const [navOpen, setNavOpen] = useState(props.screenType !== 1 ? false : true);
    const [userName, setUserName] = useState("...");
    const [sideNav, setSideNav] = useState([]);
    const [showRibbon, setShowRibbon] = useState(true);
    const router = useRouter();

    const handleNavigation = useCallback(
        (e) => {
            if (props.screenType !== 3) {
                const window = e.currentTarget;
                if (sideNavRef.current.clientHeight > window.scrollY + window.innerHeight) {
                    setSideNavStyle({});
                } else if (y < window.scrollY && sideNavRef.current.clientHeight < window.scrollY + window.innerHeight) {
                    setSideNavStyle({ position: "fixed", bottom: 0 });
                }
                setY(window.scrollY);
            }
        },
        [y]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    useEffect(() => {
        if (props.user.role) {
            setUserName(props.user ? props.user.firstName + (props.user.lastName ? " " + props.user.lastName : "") : "");
            setSideNav(SideNavInfo[props.user.role.toLowerCase()]);
        }
    }, [props.user]);

    return (
        <div className={joinClasses(DashboardLayout.dashboardPage, navOpen ? DashboardLayout.openNavDashboard : DashboardLayout.closeNavDashboard)}>
            <div style={{ position: "relative", width: "inherit" }}>
                <div className={DashboardLayout.sideNav} ref={sideNavRef} style={sideNavStyle}>
                    <div>
                        <div>
                            <div className={DashboardLayout.logoContainer}>
                                <LinkedImage
                                    src={navOpen ? LogoWhite : Favicon}
                                    heightOrient
                                    className={DashboardLayout.logo}
                                    alt="Logo"
                                    link="/dashboard"
                                />
                            </div>
                            <p className={DashboardLayout.version}>Version: {process.env.version}</p>
                            <div
                                className={DashboardLayout.profileContainer}
                                onClick={() => {
                                    if (props.screenType === 3) setNavOpen(false);
                                    router.push('/dashboard/user/preference')
                                }}
                            >
                                <p>Hi, {userName}</p>
                                <ProfileImage
                                    src={props.user.imageUrl}
                                    size={"small"}
                                    header
                                />
                            </div>
                            <SearchBar
                                className={DashboardLayout.searchBar}
                                setValue={console.log}
                                placeholder="Search"
                                darkTheme
                                disabled
                            />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            {props.user.role ? (
                                sideNav.map((info, key) => (
                                    <Link
                                        href={info.link}
                                        key={key}
                                        onClick={() => { if (props.screenType === 3) setNavOpen(false) }}
                                    >
                                        <div
                                            className={joinClasses(DashboardLayout.menuItem, info.activeKey === props.pageInfo.activeMenu && DashboardLayout.activeMenuItem)}
                                            style={navOpen ? {} : { margin: "auto", width: "100%" }}
                                        >
                                            {info.icon}
                                            {navOpen && <p>{info.text}</p>}
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className={DashboardLayout.menuItem}>Loading...</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <Link
                            href="/dashboard/settings"
                            onClick={() => { if (props.screenType === 3) setNavOpen(false) }}
                        >
                            <div className={joinClasses(DashboardLayout.menuItem, props.pageInfo.activeMenu === "SETTINGS" && DashboardLayout.activeMenuItem)}>
                                <Settings style={{ fontSize: "16px" }} />
                                {navOpen && <p style={{ marginLeft: "10px" }}>Settings</p>}
                            </div>
                        </Link>
                        <div className={DashboardLayout.menuItem} onClick={() => userService.logout()}>
                            <Logout style={{ fontSize: "16px" }} />
                            {navOpen && <p style={{ marginLeft: "10px" }}>Logout</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={joinClasses(navOpen ? DashboardLayout.openNavRightContainer : DashboardLayout.closeNavRightContainer)}>
                <div className={DashboardLayout.header}>
                    {
                        (props.screenType !== 2 || !navOpen) &&
                        <div style={{ width: "fit-content" }} className={DashboardLayout.mobileLogo}>
                            <LinkedImage
                                className={DashboardLayout.logo}
                                src={Logo}
                                heightOrient
                                alt="Logo"
                                link="/dashboard"
                            />
                        </div>
                    }
                    <div className={DashboardLayout.leftHeader}>
                        {props.screenType === 1 && <ConstantHamburger setOpen={setNavOpen} open={navOpen} />}
                        {
                            (props.user && props.user.organizationLogoUrl) ?
                                <LinkedImage
                                    className={DashboardLayout.organizationLogo}
                                    heightOrient
                                    src={props.user.organizationLogoUrl}
                                    alt={props.user.organization}
                                /> :
                                <p className={DashboardLayout.organizationName}>{props.user.organization}</p>
                        }
                    </div>
                    <div className={DashboardLayout.headerRight}>
                        <SearchBar
                            className={DashboardLayout.searchBar}
                            setValue={console.log}
                            placeholder="Search"
                            disabled
                        />
                        {props.screenType !== 3 && <div className={DashboardLayout.helpIcon}>?</div>}
                        {
                            props.screenType === 1 &&
                            <NotificationBell
                                setPageLoading={props.setPageLoading}
                                setNotificationToast={props.setNotificationToast}
                                stompMsg={props.stompMsg}
                            />}
                        <h3 className={DashboardLayout.userName}>{userName}</h3>
                        <ProfileImage
                            src={props.user.imageUrl}
                            className={DashboardLayout.profilePicture}
                            size={"small"}
                            header
                            dropdown
                        />
                    </div>
                </div>
                {
                    (props.user.status === 'TRIAL_PERIOD' && showRibbon) &&
                    <div className={DashboardLayout.ribbon}>
                        <p>Your free trial will end in {props.user.trialDaysPending} days.</p>
                        <Close className={DashboardLayout.hideRibbon} onClick={() => setShowRibbon(false)} />
                    </div>
                }
                <div className={DashboardLayout.content}>{props.children}</div>
                <div className={DashboardLayout.footer}>
                    <div className={DashboardLayout.leftContainer}>
                        <p>&#169;{` ${new Date().getFullYear()} WAAW GLOBAL INC. All Rights Reserved`}</p>
                        <div className={DashboardLayout.iconsContainer}>
                            {footerIcons.socialIcons.map((icon, i) => (
                                <LinkedImage
                                    className={DashboardLayout.footerIcons}
                                    key={`social_${i}`}
                                    heightOrient
                                    src={icon.src}
                                    alt={icon.alt}
                                    link={icon.link}
                                />
                            ))}
                        </div>
                    </div>
                    <LinkedImage
                        className={DashboardLayout.footerLogo}
                        src={Favicon}
                        heightOrient
                        alt="WAAW"
                    />
                </div>
            </div>
            {
                (props.user.role !== 'ADMIN' && props.screenType === 1) &&
                <FloatingClock
                    setToasterInfo={props.setToasterInfo}
                    role={props.user.role}
                    setPageLoading={props.setPageLoading}
                    clockIn={props.clockIn}
                    clockOut={props.clockOut}
                    timer={props.timer}
                    timezone={props.user.timezone}
                />
            }
            <MobileNavigation
                role={props.user.role}
                pageInfo={props.pageInfo}
                setPageInfo={props.setPageInfo}
                setNavOpen={setNavOpen}
            />
        </div>
    );
};

export default Dashboard;
