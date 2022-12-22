import { useEffect, useState } from "react";
import { WaawNoIndexHead } from "../../../components";
import { UserPreferenceStyles, DashboardStyles } from "../../../styles/pages";
import { ProfileTabs, getProfileElement } from "../../../constants";

const UserPreference = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "none",
            activeSubMenu: "none",
        });
    }, []);

    const [tabsToShow, setTabsToShow] = useState([]);
    const [active, setActive] = useState([]);
    const [shownContent, setShownContent] = useState();

    useEffect(() => {
        if (props.user.role) {
            setTabsToShow(ProfileTabs[props.user.role.toLowerCase()])
            setActive(ProfileTabs[props.user.role.toLowerCase()][0])
        }
    }, [props.user])

    useEffect(() => {
        if (props.user) {
            setShownContent(getProfileElement(active, props.user, props.setUser))
        }
    }, [active])

    return (
        <>
            <WaawNoIndexHead title='User Preferences' />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>User Preferences</h1>
            </div>
            <div className={UserPreferenceStyles.tabsContainer}>
                {
                    tabsToShow.map((tab, i) => (
                        <p
                            key={`tab_${i}`}
                            className={`${UserPreferenceStyles.tabTitle} ${active === tab && UserPreferenceStyles.activeTab}`}
                            onClick={() => setActive(tab)}>
                            {tab}
                        </p>
                    ))
                }
            </div>
            <div className={UserPreferenceStyles.preferenceBody}>
                {shownContent}
            </div>
        </>
    );
};

export default UserPreference;
