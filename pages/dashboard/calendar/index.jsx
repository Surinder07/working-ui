import { useEffect } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, Button, CalenderComponent } from "../../../components";

const Calender = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "CALENDAR",
            activeSubMenu: "none",
        });
    }, []);
    return (
        <>
            <WaawNoIndexHead title="Calender" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Calender</h1>
                <Button type="plain">+ Upload Organization Holiday</Button>
            </div>
            <div className={DashboardStyles.gridContainer}>
                <DashboardCard style={{ marginTop: "20px" }}>
                    <CalenderComponent />
                </DashboardCard>
                <div className={`${DashboardStyles.gridRightContainer} ${DashboardStyles.holidayContainer}`}>
                    <h4>Holidays</h4>
                    <ul className={DashboardStyles.holidayList}>
                        <li className={DashboardStyles.dateHoliday}>Date-Holiday</li>
                        <li className={DashboardStyles.dateHoliday}>Date-Holiday</li>
                        <li className={DashboardStyles.dateHoliday}>Date-Holiday</li>
                        <li className={DashboardStyles.dateHoliday}>Date-Holiday</li>
                        <li className={DashboardStyles.dateHoliday}>Date-Holiday</li>
                        <li className={DashboardStyles.dateHoliday}>Date-Holiday</li>
                        <li className={DashboardStyles.dateHoliday}>Date-Holiday</li>
                        <li className={DashboardStyles.dateHoliday}>Date-Holiday</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Calender;
