import { useEffect } from "react";
import { useRouter } from 'next/router';
import styles from '../../../styles/pages/Dashboard.module.css';
import WaawHead from "../../../components/WaawHead";
import Button from '../../../components/Button';
import DashboardCard from "../../../components/dashboardComponents/DashboardCard";
import TabularInfo from "../../../components/dashboardComponents/TabularInfo";

const Employees = (props) => {

    const router = useRouter();

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'dashboard',
            activeMenu: 'EMPLOYEES',
            activeSubMenu: 'none'
        })
    }, []);

    const employees = [
        {
            id: '6476475',
            employeeName: 'Name',
            locationName: 'Name',
            locationId: 'Location Id',
            employeeType: '01/29/2022',
            status: 'xyz'
        },
        {
            id: '6476475',
            employeeName: 'Name',
            locationName: 'Name',
            locationId: 'Location Id',
            employeeType: '01/29/2022',
            status: 'xyz'
        },
        {
            id: '6476475',
            employeeName: 'Name',
            locationName: 'Name',
            locationId: 'Location Id',
            employeeType: '01/29/2022',
            status: 'xyz'
        }
    ]

    const actions = [
        {
            key: 'View',
            action: (id) => router.push(`/dashboard/employees/details?id=${id}`)
        },
        {
            key: 'Deactivate',
            action: () => console.log('Api call will be added here')
        },
        {
            key: 'Delete',
            action: () => console.log('Api call will be added here')
        }
    ]

    return (
        <>
            <WaawHead title={"WaaW | Employees"} />
            <div className={styles.dashboardTitles}>
                <h1>Employees</h1>
                <Button type='plain'>+ Invite Users</Button>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Employee Sheet'
                    description='Tabular list Employee details.'
                    data={employees}
                    actions={actions}
                    pagination
                    showSearch
                    showFilter
                />
            </DashboardCard>
        </>
    )

}

export default Employees;