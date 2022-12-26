import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import router from "next/router";
import { WaawHead, TopLoader, LoadingScreen } from "../components";
import { secureLocalStorage } from "../helpers";
import { userService } from "../services/user.service";
import { NavFooterPageLayout, DashboardLayout } from "../layouts";
import { Toaster } from "../components";

function MyApp({ Component, pageProps }) {

    // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
    const [screenType, setScreenType] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [user, setUser] = useState({ role: "ADMIN" });
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

    const getActiveMenuFromPath = (path) => {
        if (path.includes("why-waaw")) {
            return "WHY_WAAW";
        } else if (path.includes("pricing")) {
            return "PRICING";
        } else return "none";
    };

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
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [toasterInfo]);

    useEffect(() => {
        router.beforePopState(({ as }) => {
            setPageInfo({ ...pageInfo, activeMenu: getActiveMenuFromPath(as) });
            return true;
        });

        return () => {
            router.beforePopState(() => true);
        };
    }, [router]);

    const checkPageLoading = () => {
        const handleStart = (url) => url !== router.asPath && setPageLoading(true);
        const handleComplete = (url) => url === router.asPath && setPageLoading(false);

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
            />
        );
    };

    return (
        <React.Fragment>
            <WaawHead />
            <div>
                <TopLoader pageLoading={pageLoading} />
                <Toaster error={toasterInfo.error} title={toasterInfo.title} message={toasterInfo.message} show={showToaster} />
                {pageLoading && <LoadingScreen />}
                {
                    pageInfo.pageView === "loggedOut" &&
                    <NavFooterPageLayout pageInfo={pageInfo} >
                        {getComponentForPages()}
                    </NavFooterPageLayout>
                }
                {
                    pageInfo.pageView === "dashboard" &&
                    <DashboardLayout pageInfo={pageInfo} setPageInfo={setPageInfo} screenType={screenType} user={user}>
                        {getComponentForPages()}
                    </DashboardLayout>
                }
                {pageInfo.pageView === "fullPage" && getComponentForPages()}
            </div>
        </React.Fragment>
    );
}

export default MyApp;
