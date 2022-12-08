import { useEffect } from "react";
import styles from '../../../styles/pages/Dashboard.module.css';
import WaawHead from "../../../components/WaawHead";
import DashboardCard from "../../../components/dashboardComponents/DashboardCard";
import TabularInfo from "../../../components/dashboardComponents/TabularInfo";
import Button from "../../../components/Button";
import { useState } from "react";
import CreateNewShift from "../../../components/modals/CreateNewShift";

const Shifts = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'dashboard',
            activeMenu: 'SHIFTS',
            activeSubMenu: 'none'
        })
    }, []);
  
     const [showModal,setShowModal] = useState(false)
     const handleShiftModal = () => {
        setShowModal(true);
     }
    const shifts = [
        {
           'Shift Id': '6476475',
            'Shift Name': 'One time register',
            'Start Date': '-',
            'End Date': '-',
            'Location Name': 'Canada',
            'Creation Date': '01/29/2022',
            status: 'Paid',
            Actions: 'not added'
        },
        {
            'Shift Id': '6476475',
            'Shift Name': 'One time register',
            'Start Date': '-',
            'End Date': '-',
            'Location Name': 'Canada',
            'Creation Date': '01/29/2022',
            status: 'Paid',
            Actions: 'not added'
        },
        {
            'Shift Id': '6476475',
            'Shift Name': 'One time register',
            'Start Date': '-',
            'End Date': '-',
            'Location Name': 'Canada',
            'Creation Date': '01/29/2022',
            status: 'Paid',
            Actions: 'not added'
        }
    ]

    return (
        <>
            <WaawHead title={"WaaW | Shifts"} />
            <div className={styles.dashboardTitles}>
                <h1>Shifts</h1>
                <Button type='plain' onClick={handleShiftModal}>+ Create new Shifts</Button>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo 
                title='Shifts' 
                description='Tabular list of all Shifts.' 
                data={shifts}
                pagination
                />
            </DashboardCard>
            <CreateNewShift setShowModal={setShowModal} showModal={showModal}/>
        </>
    )

}

export default Shifts;