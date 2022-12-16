import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, LocationModal } from "../../../components";
import { locationAndRoleService } from "../../../services";

const Locations = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "LOCATIONS",
            activeSubMenu: "none",
        });
    }, []);

    useEffect(() => {
        fetchData();        
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        locationAndRoleService.getAllLocations(pageNo, pageSize)
            .then(res => {
                if (res.error) {
                    console.log(res.message);
                } else {
                    console.log(res)
                    setData(res.data.map(loc => {
                        return {
                            internalId: loc.id,
                            locationId: loc.waawId,
                            locationName: loc.name,
                            creationDate: loc.creationDate,
                            timezone: loc.timezone,
                            activeEmployees: loc.activeEmployees,
                            inactiveEmployees: loc.inactiveEmployees,
                            status: loc.active ? 'Active' : 'Disabled'
                        }
                    }));
                    setTotalEntries(res.totalEntries);
                    setTotalPages(res.totalPages);
                }
            })
    }

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

    return (
        <>
            <WaawNoIndexHead title='Locations' />
            <LocationModal showModal={showModal} setShowModal={setShowModal} setToasterInfo={props.setToasterInfo} setReloadData={setReloadData}/>
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Locations</h1>
                <Button type='plain' onClick={() => setShowModal(true)}>+ Add new Location</Button>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Location Listing'
                    description='Tabular list of all locations.'
                    data={data}
                    pagination
                    actions={actions}
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                />
            </DashboardCard>
        </>
    )

}

export default Locations;