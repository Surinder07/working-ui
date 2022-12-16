import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, NewRoleModal } from "../../../components";

const roles = [
    {
        roleId: "6476475",
        name: "Frontend",
        creationDate: "01/01/2023",
        location: "Canada",
        createdBy: "Name",
    },
    {
        roleId: "6476476",
        name: "Backend",
        creationDate: "01/01/2023",
        location: "India",
        createdBy: "Name",
    },
    {
        roleId: "6476477",
        name: "Mern",
        creationDate: "01/01/2023",
        location: "India",
        createdBy: "Name",
    },
    {
        roleId: "6476478",
        name: "operation",
        creationDate: "01/01/2023",
        location: "USA",
        createdBy: "Name",
    },
];


const Roles = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "ROLES",
            activeSubMenu: "none",
        });
    }, []);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(roles);
    const actions = [
        {
            key: "View",
            action: (id) => console.log(`/dashboard/roles/?id=${id}`),
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
            <WaawNoIndexHead title="Roles" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Roles</h1>
                {(props.user.role === "MANAGER" || props.user.role === "ADMIN") && (
                    <Button type="plain" onClick={() => setShowModal(true)}>
                        + Add new Roles
                    </Button>
                )}
            </div>
            <DashboardCard style={{ marginTop: "20px" }}>
                <TabularInfo title="Roles" description="Tabular list for current role." data={data} actions={actions} pagination />
            </DashboardCard>
            <NewRoleModal setShowModal={setShowModal} showModal={showModal} role={props.user.role} setToasterInfo={props.setToasterInfo} />
        </>
    );
};

export default Roles;
