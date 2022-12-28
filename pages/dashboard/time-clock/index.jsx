import {useEffect, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo } from "../../../components";

const timesheet = [
    {
        inDate: '02/01/2023',
        inTime: '10:00',
        outDate: '02/01/2023',
        outTime: '05:30',
        type: 'daily',
        comment: 'N/A'
    },
    {
        inDate: '03/01/2023',
        inTime: '10:30',
        outDate: '04/01/2023',
        outTime: '06:00',
        type: 'daily',
        comment: 'N/A'
    },
    {
        inDate: '04/01/2023',
        inTime: '11:00',
        outDate: '04/01/2023',
        outTime: '06:30',
        type: 'daily',
        comment: 'N/A'
    },
]

const timeClock = (props) => {

    const [data, setData] = useState(timesheet);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "TIMECLOCK",
            activeSubMenu: "none",
        });
    }, []);

    const actions = [
        {
            key: "Add TimeSheet",
            action : () => console.log("Add TimeSheet will be added")
        },
        {
            key: "Edit",
            action: () => console.log("Api call will be added here"),
        },
        {
            key: "Delete",
            action: () => console.log("Api call will be added here"),
        },
    ];

    return (
        <>
            <WaawNoIndexHead title="Time Clock" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Time Clock</h1>
            </div>

            <DashboardCard style={{marginTop: "20px"}}>
                <TabularInfo
                    title="Time Sheet"
                    description="Tabular list of all Time Sheet."
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
        </>
    );
};

export default timeClock;
