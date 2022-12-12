import { useEffect, useState } from "react";
import { DashboardStyles } from '../../../styles/pages';
import { WaawNoIndexHead, DashboardCard, TabularInfo, Button, CreateNewShiftModal } from "../../../components";

const Shifts = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'dashboard',
            activeMenu: 'SHIFTS',
            activeSubMenu: 'none'
        })
    }, []);

    const [showModal, setShowModal] = useState(false)
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
            <WaawNoIndexHead title='Shifts' />
            <div className={DashboardStyles.dashboardTitles}>
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
            <CreateNewShiftModal setShowModal={setShowModal} showModal={showModal} />
        </>
    )

}

export default Shifts;