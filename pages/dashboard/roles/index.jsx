import { useEffect } from "react";
import styles from '../../../styles/pages/Dashboard.module.css';
import WaawHead from "../../../components/WaawHead";
import Button from '../../../components/Button';
import DashboardCard from "../../../components/dashboardComponents/DashboardCard";
import TabularInfo from "../../../components/dashboardComponents/TabularInfo";

const Roles = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'dashboard',
            activeMenu: 'ROLES',
            activeSubMenu: 'none'
        })
    }, []);

    const roles = [
        {
            'Role Id': '6476475',
            Name: 'Name',
            'Creation date': '01/01/2023',
            Location: 'Canada',
            'Created By': 'Name',
            Actions: 'not added'
        },
        {
            'Role Id': '6476475',
            Name: 'Name',
            'Creation date': '01/01/2023',
            Location: 'Canada',
            'Created By': 'Name',
            Actions: 'not added'
        },
        {
            'Role Id': '6476475',
            Name: 'Name',
            'Creation date': '01/01/2023',
            Location: 'Canada',
            'Created By': 'Name',
            Actions: 'not added'
        }
    ]

    return (
        <>
            <WaawHead title={"WaaW | Roles"} />
            <div className={styles.dashboardTitles}>
                <h1>Roles</h1>
                <Button type='plain'>+ Add new Roles</Button>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo 
                title='Roles' 
                description='Tabular list for current role.' 
                data={roles}
                pagination
                />
            </DashboardCard>
        </>
    )

}

export default Roles;