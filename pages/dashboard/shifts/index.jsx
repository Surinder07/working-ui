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

     const actions = [
        {
          key: "View",
          action: (id) => console.log(`/dashboard/shifts/?id=${id}`),
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


    const shifts = [
        {
            shiftId: '6476475',
            shiftName: 'One time register',
            startDate: '-',
            endDate: '-',
            locationName: 'Canada',
            creationDate: '01/29/2022',
            status: 'Paid',
            subData: [
                {
                    test: 'test',
                    test2: 'test'
                },
                {
                    test: 'test2',
                    test2: 'test2F'
                }
            ]
        },
        {
            shiftId: '6476475',
            shiftName: 'One time register',
            startDate: '-',
            endDate: '-',
            locationName: 'Canada',
            creationDate: '01/29/2022',
            status: 'Paid',
            subData: [
                {
                    test: 'test',
                    test2: 'test'
                },
                {
                    test: 'test2',
                    test2: 'test2F'
                }
            ]
        },
        {
            shiftId: '6476475',
            shiftName: 'Test',
            startDate: '-',
            endDate: '-',
            locationName: 'Canada',
            creationDate: '01/29/2022',
            status: 'Paid',
            subData: [
                {
                    test: 'test',
                    test2: 'test'
                },
                {
                    test: 'test2',
                    test2: 'test2F'
                }
            ]
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
                    actions={actions}
                    pagination
                />
            </DashboardCard>
            <CreateNewShift setShowModal={setShowModal} showModal={showModal}/>
        </>
    )

}

export default Shifts;