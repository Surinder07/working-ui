import { useEffect } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, CalendarComponent } from "../../../components";

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
            <CalendarComponent />
        </>
    );
};

export default Calender;
