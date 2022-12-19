import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo, Button } from "../../../components";
import RequestsModal from "../../../components/modals/EditRequestModal";

const requests = [
    {
        requestId: "6476475",
        requestType: "request",
        initiationDate: "01/01/2023",
        location: "Canada",
        initiatedBy: "Rahul",
        assignedTo: "Rajiv",
        status: "xyz",
        history: [
            {
                title: 'Xyz Raised a Request',
                description: 'Request for early leave on the next to next week',
                date: '29th August,2022',
                status: 'bad'
            },
            {
                title: 'Xyz Raised a Request',
                description: 'Request for early leave on the next to next week',
                date: '29th August,2022',
                status: 'basic'
            },
            {
                title: 'Xyz Raised a Request',
                description: 'Request for early leave on the next to next week',
                date: '29th August,2022',
                status: 'ok'
            }
        ]
    },
    {
        requestId: "6476476",
        requestType: "request",
        initiationDate: "01/02/2023",
        location: "India",
        initiatedBy: "Arpit",
        assignedTo: "Sandeep",
        status: "xyz",
        history: [
            {
                title: 'Xyz Raised a Request',
                description: 'Request for early leave on the next to next week',
                date: '29th August,2022',
                status: 'bad'
            }
        ]
    },
    {
        requestId: "6476477",
        requestType: "request",
        initiationDate: "03/01/2023",
        location: "USA",
        initiatedBy: "Albert",
        assignedTo: "Edward",
        status: {
            text: "OPEN",
            displayType: 'bg',
            status: 'ok'
        },
        history: [
            {
                title: 'Xyz Raised a Request',
                description: 'Request for early leave on the next to next week',
                date: '29th August,2022',
                status: 'bad'
            }
        ]
    },
    {
        requestId: "6476478",
        requestType: "request",
        initiationDate: "02/02/2023",
        location: "Mexico",
        initiatedBy: "Ethan",
        assignedTo: "Ishac",
        status: {
            text: "CLOSED",
            displayType: 'bg',
            status: 'warn'
        },
        history: [
            {
                title: 'Xyz Raised a Request',
                description: 'Request for early leave on the next to next week',
                date: '29th August,2022',
                status: 'bad'
            }
        ]
    },
];

const Requests = (props) => {
    const [editId, setEditId] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [data, setData] = useState(requests)
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


    return (
        <>
            <WaawNoIndexHead title={"Requests"} />
            <RequestsModal showModal={showEditModal} setShowModal={setShowEditModal} id={editId} />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Requests</h1>
                {props.user.role === "MANAGER" || (props.user.role === "ADMIN" && <Button type="plain">+ Invite Users</Button>)}
            </div>
            <DashboardCard style={{ marginTop: "20px" }}>
                <TabularInfo title="Request Details" description="Tabular representation of all the requests" data={data} actions={actions} pagination />
            </DashboardCard>
        </>
    );
};

export default Requests;
