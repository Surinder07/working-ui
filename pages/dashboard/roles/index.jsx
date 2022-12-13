import { useEffect, useState } from "react";
import { DashboardStyles } from '../../../styles/pages';
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, NewRoleModal } from "../../../components";

const Roles = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'dashboard',
            activeMenu: 'ROLES',
            activeSubMenu: 'none'
        })
    }, []);
    const [showModal, setShowModal] = useState(false)

    const handleNewRole = () => {
        setShowModal(true)
    }

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


    const roles = [
        {
            roleId: '6476475',
            name: 'Frontend',
            creationDate: '01/01/2023',
            location: 'Canada',
            createdBy: 'Name'
        },
        {
            roleId: '6476476',
            name: 'Backend',
            creationDate: '01/01/2023',
            location: 'India',
            createdBy: 'Name'
        },
        {
            roleId: '6476477',
            name: 'Mern',
            creationDate: '01/01/2023',
            location: 'India',
            createdBy: 'Name'
        },
        {
            roleId: '6476478',
            name: 'operation',
            creationDate: '01/01/2023',
            location: 'USA',
            createdBy: 'Name'
        }
    ]

    return (
        <>
            <WaawNoIndexHead title='Roles' />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Roles</h1>
                <Button type='plain' onClick={handleNewRole}>+ Add new Roles</Button>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Roles'
                    description='Tabular list for current role.'
                    data={roles}
                    actions={actions}
                    pagination
                />
            </DashboardCard>
            <NewRoleModal setShowModal={setShowModal} showModal={showModal} />
        </>
    )

}

export default Roles;