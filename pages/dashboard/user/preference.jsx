import { useEffect, useState } from "react";
import { WaawNoIndexHead, Email, Profile, Organization, Security } from "../../../components";
import { UserPreferenceStyles, DashboardStyles } from "../../../styles/pages";

const UserPreference = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "none",
            activeSubMenu: "none",
        });
    }, []);

    const [active, setActive] = useState(1);

    return (
        <>
            <WaawNoIndexHead title='User Preferences' />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>User Preferences</h1>
            </div>
            <div className={UserPreferenceStyles.tabsContainer}>
                <p className={`${UserPreferenceStyles.tabTitle} ${active === 1 && UserPreferenceStyles.activeTab}`} onClick={() => setActive(1)}>
                    Profile
                </p>
                <p className={`${UserPreferenceStyles.tabTitle} ${active === 2 && UserPreferenceStyles.activeTab}`} onClick={() => setActive(2)}>
                    Organization
                </p>
                <p className={`${UserPreferenceStyles.tabTitle} ${active === 3 && UserPreferenceStyles.activeTab}`} onClick={() => setActive(3)}>
                    Email
                </p>
                <p className={`${UserPreferenceStyles.tabTitle} ${active === 4 && UserPreferenceStyles.activeTab}`} onClick={() => setActive(4)}>
                    Security
                </p>
                <p className={`${UserPreferenceStyles.tabTitle} ${active === 5 && UserPreferenceStyles.activeTab}`} onClick={() => setActive(5)}>
                    PaymentMethods
                </p>
            </div>
            <div className={UserPreferenceStyles.preferenceBody}>
                {active === 1 && <Profile user={props.user} setUser={props.setUser} />}
                {active === 2 && <Organization />}
                {active === 3 && <Email />}
                {active === 4 && <Security />}
            </div>
        </>
    );
};

export default UserPreference;
