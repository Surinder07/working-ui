import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo, Button, NewShiftModal, ShiftsFilter } from "../../../components";

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
                comments: {
                    text: "dtrstrstr dydytdyr stetrd  yfiugoip ougft drsetsrdyf tuygiuhoiuyftsd fygug yftrstdtf guiyutdy rfyguigtd yrsgguitrtyd  fhcgvhgytry dfcgvhjgy ",
                    displayType: "comment"
                }
            },
            {
                employeeId: "229966",
                employeeName: "Name",
                emailAddress: "email@gmail.com",
                locationName: "India",
                shiftInTime: "10:00 AM",
                shiftOutTime: "05:00 PM",
                status: "N/A",
                comments: {
                    text: "dtrstrstr dydytdyr stetrd  yfiugoip ougft drsetsrdyf tuygiuhoiuyftsd fygug yftrstdtf guiyutdy rfyguigtd yrsgguitrtyd  fhcgvhgytry dfcgvhjgy ",
                    displayType: "comment"
                }
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
    const [showFilterModal, setShowFilterModal] = useState(true);
    const [data, setData] = useState(shifts);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);

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



    return (
        <>
            <WaawNoIndexHead title="Shifts" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Shifts</h1>
                {
                    (props.user.role === "MANAGER" || props.user.role === "ADMIN") &&
                    <Button type="plain" onClick={() => setShowAddModal(true)}>
                        + Create new Shifts
                    </Button>
                }
            </div>
            <DashboardCard style={{ marginTop: "20px" }}>
                <TabularInfo
                    title="Shifts"
                    description="Tabular list of all Shifts."
                    data={data}
                    actions={actions}
                    pagination
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                    showSearch
                    showFilter
                />
            </DashboardCard>
            <NewShiftModal setShowModal={setShowAddModal} showModal={showAddModal} buttonText="CreateShift" setToasterInfo={props.setToasterInfo} role={props.user.role}/>
            <ShiftsFilter setShowModal={setShowFilterModal} showModal={showFilterModal} setToasterInfo={props.setToasterInfo} role={props.user.role}/>
        </>
    );
};

export default Shifts;
