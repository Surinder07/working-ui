import {useEffect, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, DashboardCard, TabularInfo} from "../../../components";
import RequestsModal from "../../../components/modals/EditRequestModal";

const Requests = (props) => {
    const [editId, setEditId] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "REQUESTS",
            activeSubMenu: "none",
        });
    }, []);

    const actions = [
        {
            key: "View",
            action: (id) => console.log(`/dashboard/requests/?id=${id}`),
        },
        {
            key: "Edit",
            action: (id) => {
                setEditId(id);
                setShowEditModal(true);
            },
        },
        {
            key: "Delete",
            action: () => console.log("Api call will be added here"),
        },
    ];

    const requests = [
        {
            requestId: "6476475",
            requestType: "request",
            initiationDate: "01/01/2023",
            location: "Canada",
            initiatedBy: "Rahul",
            assignedTo: "Rajiv",
            status: "xyz",
        },
        {
            requestId: "6476476",
            requestType: "request",
            initiationDate: "01/02/2023",
            location: "India",
            initiatedBy: "Arpit",
            assignedTo: "Sandeep",
            status: "xyz",
        },
        {
            requestId: "6476477",
            requestType: "request",
            initiationDate: "03/01/2023",
            location: "USA",
            initiatedBy: "Albert",
            assignedTo: "Edward",
            status: "xyz",
        },
        {
            requestId: "6476478",
            requestType: "request",
            initiationDate: "02/02/2023",
            location: "Mexico",
            initiatedBy: "Ethan",
            assignedTo: "Ishac",
            status: "xyz",
        },
    ];

    return (
        <>
            <WaawNoIndexHead title={"Requests"} />
            <RequestsModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                id={editId}
            />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Requests</h1>
                {/* <Button type='plain'>+ Invite Users</Button> */}
            </div>
            <DashboardCard style={{marginTop: "20px"}}>
                <TabularInfo
                    title="Request Details"
                    description="Tabular representation of all the requests"
                    data={requests}
                    actions={actions}
                    pagination
                />
            </DashboardCard>
        </>
    );
};

export default Requests;
