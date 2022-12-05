import { useEffect } from "react";
import styles from '../../../styles/pages/Dashboard.module.css';
import WaawHead from "../../../components/WaawHead";
import DashboardCard from "../../../components/dashboardComponents/DashboardCard";
import TabularInfo from "../../../components/dashboardComponents/TabularInfo";

const Requests = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'dashboard',
            activeMenu: 'REQUESTS',
            activeSubMenu: 'none'
        })
    }, []);

    const requests = [
        {
            'Request Id': '6476475',
            'Request Type': 'Canada',
            'Initiation Date': '01/01/2023',
            Location: 'Canada',
            'Initiated By': 'Name',
            'Assigned To': 'Name',
            status: 'xyz',
            Actions: 'Not added'
        },
        {
            'Request Id': '7476475',
            'Request Type': 'India',
            'Initiation Date': '02/01/2023',
            Location: 'India',
            'Initiated By': 'Name',
            'Assigned To': 'Name',
            status: 'xyz',
            Actions: 'Not added'
        },
        {
            'Request Id': '8076475',
            'Request Type': 'Mexico',
            'Initiation Date': '03/01/2023',
            Location: 'Mexico',
            'Initiated By': 'Name',
            'Assigned To': 'Name',
            status: 'xyz',
            Actions: 'Not added'
        }
    ]

    return (
        <>
            <WaawHead title={"WaaW | Requests"} />
            <div className={styles.dashboardTitles}>
                <h1>Requests</h1>
                {/* <Button type='plain'>+ Invite Users</Button> */}
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo 
                title='Request Details' 
                description='Tabular representation of all the requests' 
                data={requests}
                pagination
                />
            </DashboardCard>
        </>
    )

}

export default Requests;