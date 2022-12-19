import {useEffect, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, DashboardCard, TabularInfo, Button, NewShiftModal} from "../../../components";

const Shifts = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "SHIFTS",
            activeSubMenu: "none",
        });
    }, []);

    const [showAddModal, setShowAddModal] = useState(false);

    const actions = [
        {
            key: "View",
            action: (id) => console.log(`/dashboard/shifts/?id=${id}`),
        },
        {
            key: "Deactivate",
            action: () => console.log("Api call will be added here"),
        },
        {
            key: "Delete",
            action: () => console.log("Api call will be added here"),
        },
    ];

    const shifts = [
        {
            shiftId: "6476475",
            shiftName: "One time register",
            startDate: "01/12/2022",
            endDate: "30/12/2022",
            locationName: "India",
            creationDate: "01/29/2022",
            status: "Status",
            subData: [
                {
                    employeeId: "229965",
                    employeeName: "Name",
                    emailAddress: "email@gmail.com",
                    locationName: "India",
                    shiftInTime: "10:00 AM",
                    shiftOutTime: "05:00 PM",
                    status: "N/A",
                    comments: "N/A",
                },
                {
                    employeeId: "229966",
                    employeeName: "Name",
                    emailAddress: "email@gmail.com",
                    locationName: "India",
                    shiftInTime: "10:00 AM",
                    shiftOutTime: "05:00 PM",
                    status: "N/A",
                    comments: "N/A",
                },
            ],
        },
        {
            shiftId: "6476476",
            shiftName: "One time register",
            startDate: "-",
            endDate: "-",
            locationName: "Canada",
            creationDate: "01/29/2022",
            status: "Status",
            subData: [
                {
                    employeeId: "229967",
                    employeeName: "Name",
                    emailAddress: "email@gmail.com",
                    locationName: "Canada",
                    shiftInTime: "10:00 AM",
                    shiftOutTime: "05:00 PM",
                    status: "N/A",
                    comments: "N/A",
                },
                {
                    employeeId: "229968",
                    employeeName: "Name",
                    emailAddress: "email@gmail.com",
                    locationName: "Canada",
                    shiftInTime: "10:00 AM",
                    shiftOutTime: "05:00 PM",
                    status: "N/A",
                    comments: "N/A",
                },
            ],
        },
        {
            shiftId: "6476477",
            shiftName: "Test",
            startDate: "01/01/2023",
            endDate: "30/01/2023",
            locationName: "India",
            creationDate: "01/29/2022",
            status: "Status",
            subData: [
                {
                    employeeId: "229969",
                    employeeName: "Name",
                    emailAddress: "email@gmail.com",
                    locationName: "India",
                    shiftInTime: "10:00 AM",
                    shiftOutTime: "05:00 PM",
                    status: "N/A",
                    comments: "N/A",
                },
                {
                    employeeId: "229970",
                    employeeName: "Name",
                    emailAddress: "email@gmail.com",
                    locationName: "India",
                    shiftInTime: "10:00 AM",
                    shiftOutTime: "05:00 PM",
                    status: "N/A",
                    comments: "N/A",
                },
            ],
        },
    ];

    return (
        <>
            <WaawNoIndexHead title="Shifts" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Shifts</h1>
                {props.user.role === "MANAGER" ||
                    (props.user.role === "ADMIN" && (
                        <Button type="plain" onClick={() => setShowAddModal(true)}>
                            + Create new Shifts
                        </Button>
                    ))}
            </div>
            <DashboardCard style={{marginTop: "20px"}}>
                <TabularInfo title="Shifts" description="Tabular list of all Shifts." data={shifts} actions={actions} pagination />
            </DashboardCard>
            <NewShiftModal setShowModal={setShowAddModal} showModal={showAddModal} buttonText="CreateShift" />
        </>
    );
};

export default Shifts;
