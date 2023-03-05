import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import router from "next/router";
import { WaawHead, TopLoader, LoadingScreen, NotificationToaster, Toaster, StompSocket } from "../components";
import { secureLocalStorage, getActiveMenuFromPath, getPageLayoutFromPath } from "../helpers";
import { userService } from "../services/user.service";
import { NavFooterPageLayout, DashboardLayout } from "../layouts";

function MyApp({ Component, pageProps }) {

    // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
    const [screenType, setScreenType] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [user, setUser] = useState({});
    const [allowedRoles, setAllowedRoles] = useState([]); // On each page this will be set to check if given role can access the page
    const [token, setToken] = useState(null);
    const [pageInfo, setPageInfo] = useState({
        authenticationRequired: false,
        // Possible values: {loggedOut, dashboard, fullPage}
        pageView: "loggedOut",
        activeMenu: "none",
        activeSubMenu: "none",
    });
    const [toasterInfo, setToasterInfo] = useState({
        error: false,
        title: "",
        message: "",
    });
    const [showToaster, setShowToaster] = useState(false);
    const [notificationToast, setNotificationToast] = useState({
        show: false,
        title: '',
        message: ''
    });
    const [stompMsg, setStompMsg] = useState({
        shift: false,
        holiday: false,
        invite: false,
        timesheet: {
            allow: false,
            allowAfterMinutes: 0
        },
        notification: {}
    })

    useEffect(() => {
        if (pageInfo.authenticationRequired && !allowedRoles.includes(user.role)) {
            router.push("/dashboard");
        }
    }, [allowedRoles]);

    useEffect(() => {
        if (toasterInfo.title !== "") {
            setShowToaster(true);
            const timer = setTimeout(() => {
                setShowToaster(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [toasterInfo]);

    useEffect(() => {
        if (notificationToast.show) {
            const timer = setTimeout(() => {
                setNotificationToast({
                    show: false,
                    title: '',
                    message: ''
                })
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [notificationToast]);

    useEffect(() => {
        router.beforePopState(({ as }) => {
            setPageInfo(
                {
                    ...pageInfo,
                    activeMenu: getActiveMenuFromPath(as),
                    pageView: getPageLayoutFromPath(as)
                }
            );
            return true;
        });

        return () => {
            router.beforePopState(() => true);
        };
    }, [router]);

    const checkPageLoading = () => {
        const handleStart = (url) => url !== router.asPath && setPageLoading(true);
        const handleComplete = (url) => {
            url === router.asPath && setPageLoading(false);
            if (localStorage.getItem(userService.USER_KEY)) {
                setUser(JSON.parse(secureLocalStorage.getData(userService.USER_KEY)));
            }
        }

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    };

    useEffect(() => {
        checkPageLoading();
        updateScreenTypeProp();
    }, []);

    useEffect(() => {
        if (!user.role && localStorage.getItem(userService.USER_KEY)) {
            setUser(JSON.parse(secureLocalStorage.getData(userService.USER_KEY)));
            setToken(secureLocalStorage.getData(userService.TOKEN_KEY))
        } else if (!user.role && pageInfo.authenticationRequired) {
            router.push("/login");
        }
    }, []);

    const updateScreenTypeProp = () => {
        if (window.innerWidth < 640) {
            setScreenType(3);
        } else if (window.innerWidth > 1000) {
            setScreenType(1);
        } else {
            setScreenType(2);
        }
    };

    const getComponentForPages = () => {
        return (
            <Component
                {...pageProps}
                screenType={screenType}
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
                pageInfo={pageInfo}
                setPageInfo={setPageInfo}
                setToasterInfo={setToasterInfo}
                setAllowedRoles={setAllowedRoles}
                setPageLoading={setPageLoading}
                stompMsg={stompMsg}
                resetStompMsg={(topic) => {
                    let temp = stompMsg;
                    temp[topic] = topic === 'timesheet' ? {
                        allow: false,
                        allowAfterMinutes: 0
                    } : false;
                    setStompMsg(temp);
                }}
            />
        );
    };

    return (
        <React.Fragment>
            <WaawHead />
            <div>
                <Toaster
                    error={toasterInfo.error}
                    title={toasterInfo.title}
                    message={toasterInfo.message}
                    show={showToaster}
                    setShowToaster={setShowToaster}
                />
                <NotificationToaster
                    title={notificationToast.title}
                    description={notificationToast.message}
                    show={notificationToast.show}
                    setToast={setNotificationToast}
                />
                {pageLoading && <LoadingScreen />}
                <TopLoader pageLoading={pageLoading} />
                {
                    pageInfo.pageView === "loggedOut" &&
                    <NavFooterPageLayout pageInfo={pageInfo} >
                        {getComponentForPages()}
                    </NavFooterPageLayout>
                }
                {
                    pageInfo.pageView === "dashboard" &&
                    <DashboardLayout
                        pageInfo={pageInfo}
                        setPageInfo={setPageInfo}
                        screenType={screenType}
                        user={user}
                        setToasterInfo={setToasterInfo}
                        setPageLoading={setPageLoading}
                        stompMsg={stompMsg.notification}
                    >
                        {
                            token &&
                            <StompSocket
                                token={token}
                                setNotificationToast={setNotificationToast}
                                stompMsg={stompMsg}
                                setStompMsg={setStompMsg}
                            />
                        }
                        {getComponentForPages()}
                    </DashboardLayout>
                }
                {pageInfo.pageView === "fullPage" && getComponentForPages()}
            </div>
        </React.Fragment>
    );
}

export default MyApp;
