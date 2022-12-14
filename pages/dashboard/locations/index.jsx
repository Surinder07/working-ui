import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, LocationModal } from "../../../components";

const Locations = (props) => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "LOCATIONS",
            activeSubMenu: "none",
        });
    }, []);

    const actions = [
        {
            key: "View",
            action: (id) => console.log(`/dashboard/locations/`),
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

    const locations = [
        {
            locationId: "6476475",
            locatioName: "Canada",
            creationDate: "01/01/2023",
            timezone: "EST",
            numberOfActiveEmployees: "200",
            NumberOfInactiveEmployees: "25",
            status: "xyz",
        },
        {
            locationId: "6476475",
            locatioName: "India",
            creationDate: "02/01/2023",
            timezone: "IST",
            numberOfActiveEmployees: "200",
            NumberOfInactiveEmployees: "25",
            status: "xyz",
        },
        {
            locationId: "6476475",
            locatioName: "Australia",
            creationDate: "03/01/2023",
            timezone: "EST",
            numberOfActiveEmployees: "200",
            NumberOfInactiveEmployees: "25",
            status: "xyz",
        }
    ]

    return (
        <>
            <WaawNoIndexHead title='Locations' />
            <LocationModal showModal={showModal} setShowModal={setShowModal}/>
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Locations</h1>
                <Button type='plain' onClick={()=> setShowModal(true)}>+ Add new Location</Button>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Location Listing'
                    description='Tabular list of Locationwise employees.'
                    data={locations}
                    pagination
                    actions={actions}
                />
            </DashboardCard>
        </>
    )

}

export default Locations;