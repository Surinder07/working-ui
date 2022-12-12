import { useEffect } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo } from "../../../components";

const Locations = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "LOCATIONS",
            activeSubMenu: "none",
        });
    }, []);

    const locations = [
        {
            'Location Id': '6476475',
            'Location Name': 'Canada',
            'Creation Date': '01/01/2023',
            'Timezone': 'EST',
            'Number of active employees': '200',
            'Number of inactive employees': '25',
            status: 'xyz',
        },
        {
            'Location Id': '6476475',
            'Location Name': 'India',
            'Creation Date': '02/01/2023',
            'Timezone': 'IST',
            'Number of active employees': '200',
            'Number of inactive employees': '25',
            status: 'xyz',
        },
        {
            'Location Id': '6476475',
            'Location Name': 'Australia',
            'Creation Date': '03/01/2023',
            'Timezone': 'EST',
            'Number of active employees': '200',
            'Number of inactive employees': '25',
            status: 'xyz',
        }
    ]

    return (
        <>
            <WaawNoIndexHead title='Locations' />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Locations</h1>
                <Button type='plain'>+ Add new Location</Button>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Location Listing'
                    description='Tabular list of Locationwise employees.'
                    data={locations}
                    pagination
                    actions={{
                        key: 'Edit',
                        action: () => console.log('edit')
                    }}
                />
            </DashboardCard>
        </>
    )

}

export default Locations;