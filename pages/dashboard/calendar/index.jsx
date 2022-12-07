import { useEffect } from "react";
import styles from "../../../styles/pages/Dashboard.module.css";
import WaawHead from "../../../components/WaawHead";
import DashboardCard from "../../../components/dashboardComponents/DashboardCard";
import Button from "../../../components/Button";
import CalenderComponent from "../../../components/dashboardComponents/Calendar";

const Calender = (props) => {
  useEffect(() => {
    props.setPageInfo({
      authenticationRequired: false,
      pageView: "dashboard",
      activeMenu: "DASHBOARD",
      activeSubMenu: "none",
    });
  }, []);
  return (
    <>
      <WaawHead title={"WaaW | Calender"} />
      <div className={styles.dashboardTitles}>
        <h1>Calender</h1>
        <Button type="plain">+ Upload Organization Holiday</Button>
      </div>
      <div className={styles.gridContainer}>
        <DashboardCard style={{ marginTop: "20px" }}>
          <CalenderComponent />
        </DashboardCard>
        <div className={`${styles.gridRightContainer} ${styles.holidayContainer}`}>
          <h4>Holidays</h4>
          <ul className={styles.holidayList}>
            <li className={styles.dateHoliday}>Date-Holiday</li>
            <li className={styles.dateHoliday}>Date-Holiday</li>
            <li className={styles.dateHoliday}>Date-Holiday</li>
            <li className={styles.dateHoliday}>Date-Holiday</li>
            <li className={styles.dateHoliday}>Date-Holiday</li>
            <li className={styles.dateHoliday}>Date-Holiday</li>
            <li className={styles.dateHoliday}>Date-Holiday</li>
            <li className={styles.dateHoliday}>Date-Holiday</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Calender;
