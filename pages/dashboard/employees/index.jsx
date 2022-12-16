import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, Button, DashboardCard, TabularInfo, InviteUserModal} from "../../../components";

const Employees = (props) => {
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "EMPLOYEES",
            activeSubMenu: "none",
        });
    }, []);

    const employees = [
        {
            id: "6476475",
            employeeName: "Sanjay",
            locationName: "India",
            locationId: "Location Id",
            typeOfEmployee: "FullTime",
            status: "xyz",
        },
        {
            id: "6476476",
            employeeName: "Rajvir",
            locationName: "India",
            locationId: "Location Id",
            typeOfEmployee: "PartTime",
            status: "xyz",
        },
        {
            id: "6476478",
            employeeName: "Mandeep",
            locationName: "Canada",
            locationId: "Location Id",
            typeOfEmployee: "Intern",
            status: "xyz",
        },
        ,
        {
            id: "6476479",
            employeeName: "Happy Singh",
            locationName: "Canada",
            locationId: "Location Id",
            typeOfEmployee: "FullTime",
            status: "xyz",
        },
    ];

    const actions = [
        {
            key: "View",
            action: (id) => router.push(`/dashboard/employees/details?id=${id}`),
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
            <WaawNoIndexHead title="Employees" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Employees</h1>
                {(props.user.role === "MANAGER" || props.user.role === "ADMIN") && (
                    <Button type="plain" onClick={() => setShowModal(true)}>
                        + Invite Users
                    </Button>
                )}
            </div>
            <DashboardCard style={{marginTop: "20px"}}>
                <TabularInfo title="Employee Sheet" description="Tabular list Employee details." data={employees} actions={actions} pagination showSearch showFilter />
            </DashboardCard>
            <InviteUserModal setShowModal={setShowModal} showModal={showModal} />
        </>
    );
};

export default Employees;
