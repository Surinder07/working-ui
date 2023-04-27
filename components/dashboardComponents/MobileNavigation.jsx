import { MobileNavigationStyles } from "../../styles/elements";
import { Dashboard, CalendarMonth, Notifications, Menu, TrackChanges, Schedule } from "@mui/icons-material";
import { joinClasses } from "../../helpers";
import Link from "next/link";
import { useEffect, useState } from "react";

const MobileNavigation = (props) => {

    const [isVisible, setIsVisible] = useState(true);
    let lastScrollTop = 0;

    const listenToScroll = () => {
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop) {
            setIsVisible(false);
        } else if (st < lastScrollTop) {
            setIsVisible(true)
        } // else was horizontal scroll
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    };

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    return (
        <div className={joinClasses(
            MobileNavigationStyles.container,
            isVisible ? MobileNavigationStyles.containerVisible : MobileNavigationStyles.containerHidden
        )}>
            <div className={MobileNavigationStyles.circularShadow}></div>
            <Link
                onClick={() => {
                    props.setPageInfo({ ...props.pageInfo, activeMenu: 'DASHBOARD' })
                    props.setNavOpen(false)
                }}
                href='/dashboard'
                className={joinClasses(
                    MobileNavigationStyles.iconContainer,
                    props.pageInfo.activeMenu === 'DASHBOARD' && MobileNavigationStyles.activeButton
                )}>
                <Dashboard style={{ fontSize: "20px" }} />
            </Link>
            <Link
                onClick={() => {
                    props.setPageInfo({ ...props.pageInfo, activeMenu: 'CALENDAR' })
                    props.setNavOpen(false)
                }}
                href='/dashboard/calendar'
                className={joinClasses(
                    MobileNavigationStyles.iconContainer,
                    props.pageInfo.activeMenu === 'CALENDAR' && MobileNavigationStyles.activeButton
                )}>
                <CalendarMonth style={{ fontSize: "20px" }} />
            </Link>
            <div></div>
            <Link
                onClick={() => {
                    props.setPageInfo({ ...props.pageInfo, activeMenu: props.role === 'ADMIN' ? 'SHIFTS' : 'TIMECLOCK' })
                    props.setNavOpen(false)
                }}
                href={props.role === 'ADMIN' ? '/dashboard/shifts' : '/dashboard/time-clock'}
                className={joinClasses(
                    MobileNavigationStyles.middleIconContainer,
                    (props.pageInfo.activeMenu === 'SHIFTS' || props.pageInfo.activeMenu === 'TIMECLOCK')
                    && MobileNavigationStyles.activeButton
                )}>
                {
                    props.role === 'ADMIN' ?
                        <TrackChanges style={{ fontSize: "20px" }} /> :
                        <Schedule style={{ fontSize: "20px" }} />
                }
            </Link>
            <Link
                onClick={() => {
                    props.setPageInfo({ ...props.pageInfo, activeMenu: 'NOTIFICATIONS' })
                    props.setNavOpen(false)
                }}
                href='/dashboard/notifications'
                className={joinClasses(
                    MobileNavigationStyles.iconContainer,
                    props.pageInfo.activeMenu === 'NOTIFICATIONS' && MobileNavigationStyles.activeButton
                )}>
                <Notifications style={{ fontSize: "20px" }} />
            </Link>
            <div
                onClick={() => {
                    props.setPageInfo({ ...props.pageInfo, activeMenu: 'MENU' })
                    props.setNavOpen(true)
                }}
                className={joinClasses(
                    MobileNavigationStyles.iconContainer,
                    props.pageInfo.activeMenu === 'MENU' && MobileNavigationStyles.activeButton
                )}>
                <Menu style={{ fontSize: "20px" }} />
            </div>
        </div>
    )
}

export default MobileNavigation;