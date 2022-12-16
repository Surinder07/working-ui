import {useEffect, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, Button, CalendarComponent, HolidayModal} from "../../../components";

const Calender = (props) => {
    const [showModal, setShowModal] = useState(false);
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
            <HolidayModal showModal={showModal} setShowModal={setShowModal} setToasterInfo={props.setToasterInfo}/>
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Calender</h1>
                {props.user.role === "MANAGER" && (
                    <Button type="plain" onClick={() => setShowModal(true)}>
                        + Upload Organization Holiday
                    </Button>
                )}
            </div>
            <CalendarComponent />
        </>
    );
};

export default Calender;
