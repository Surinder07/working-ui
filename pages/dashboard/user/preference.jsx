import { useEffect, useState } from "react";
import Email from "../../../components/dashboardComponents/userPreferences/Email";
import Profile from "../../../components/dashboardComponents/userPreferences/Profile";
import WaawHead from "../../../components/WaawHead";
import dashboardStyles from "../../../styles/pages/Dashboard.module.css";
import styles from "../../../styles/pages/UserPreference.module.css";

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
      <WaawHead title={"WaaW | User Preferences"} />
      <div className={dashboardStyles.dashboardTitles}>
        <h1>User Preferences</h1>
      </div>
      <div className={styles.tabsContainer}>
        <p className={`${styles.tabTitle} ${active === 1 && styles.activeTab}`} onClick={() => setActive(1)}>
          Profile
        </p>
        <p className={`${styles.tabTitle} ${active === 2 && styles.activeTab}`} onClick={() => setActive(2)}>
          Organization
        </p>
        <p className={`${styles.tabTitle} ${active === 3 && styles.activeTab}`} onClick={() => setActive(3)}>
          Email
        </p>
        <p className={`${styles.tabTitle} ${active === 4 && styles.activeTab}`} onClick={() => setActive(4)}>
          Security
        </p>
        <p className={`${styles.tabTitle} ${active === 5 && styles.activeTab}`} onClick={() => setActive(5)}>
          PaymentMethods
        </p>
      </div>
      <div className={styles.preferenceBody}>
        {active === 1 && <Profile />}
        {active === 3 && <Email />}
      </div>
    </>
  );
};

export default UserPreference;
