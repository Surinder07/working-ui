import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, CalendarComponent, HolidayModal } from "../../../components";

const Calender = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [uploadButton, setUploadButton] = useState({
        text: '',
        show: false
    });

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "CALENDAR",
            activeSubMenu: "none",
        });
        props.setAllowedRoles['ADMIN', 'MANAGER', 'EMPLOYEE']
    }, []);

    useEffect(() => {
        if (props.user.role) {
            switch (props.user.role) {
                case 'ADMIN':
                    setUploadButton({
                        text: '+ Upload Organization Holiday',
                        show: true
                    })
                    break;
                case 'MANAGER':
                    setUploadButton({
                        text: '+ Upload Location Holiday',
                        show: true
                    })
                    break;
                case 'EMPLOYEE':
                    setUploadButton({
                        text: '',
                        show: false
                    })
                    break;
            }
        }
    }, [props.user])

    return (
        <>
            <WaawNoIndexHead title="Calendar" />
            {
                props.pageLoading ? <></> :
                    <>
                        <HolidayModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            setToasterInfo={props.setToasterInfo}
                            setPageLoading={props.setPageLoading}
                        />
                        <div className={DashboardStyles.dashboardTitles}>
                            <h1>Calendar</h1>
                            {
                                uploadButton.show &&
                                <Button type="plain" onClick={() => setShowModal(true)}>
                                    {uploadButton.text}
                                </Button>
                            }
                        </div>
                        <CalendarComponent
                            setPageLoading={props.setPageLoading}
                            timezone={props.user.timezone}
                            stompMsg={props.stompMsg}
                            resetStompMsg={props.resetStompMsg}
                        />
                    </>
            }
        </>
    );
};

export default Calender;
