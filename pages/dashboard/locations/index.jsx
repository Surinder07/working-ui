import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, LocationModal, DeleteModal, LocationFilter } from "../../../components";
import { locationAndRoleService } from "../../../services";
import { PaginationDropdown } from "../../../components";
import { fetchAndHandle, fetchAndHandlePage, getLocationListing } from "../../../helpers";

const Locations = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [data, setData] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({});
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        id: '',
        show: false
    })

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "LOCATIONS",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(['ADMIN'])
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        fetchAndHandlePage(() => locationAndRoleService.getAllLocations(pageNo, pageSize, filters, sort),
            setData, setTotalEntries, setTotalPages, props.setPageLoading, props.setToasterInfo,
            getLocationListing, props.user.role);
    }

    const deleteLocation = () => {
        fetchAndHandle(() => locationAndRoleService.removeLocation(confirmDeleteModal.id),
            "Location Deleted Successfully", null, setReloadData, props.setPageLoading, null, null,
            props.setToasterInfo);
    }

    const actions = [
        {
            key: "activeToggle",
            action: (id) => {
                fetchAndHandle(() => locationAndRoleService.toggleActiveLocation(id),
                    "Location updated Successfully", null, setReloadData, props.setPageLoading, null, null,
                    props.setToasterInfo);
            },
            condition: (status) => true
        },
        {
            key: "Delete",
            action: (id) => setConfirmDeleteModal({ id: id, show: true }),
            condition: (status) => true
        },
    ];

    return (
        <>
            <WaawNoIndexHead title='Locations' />
            <DeleteModal
                modal={confirmDeleteModal}
                setModal={setConfirmDeleteModal}
                onDelete={deleteLocation}
            >
                This will permanently delete this Location and all associated Roles and Employees
            </DeleteModal>
            <LocationModal
                showModal={showModal}
                setShowModal={setShowModal}
                setToasterInfo={props.setToasterInfo}
                setReloadData={setReloadData}
                role={props.user.role}
            />
            <LocationFilter 
             setShowModal={setShowFilterModal}
             showModal={showFilterModal}
             setToasterInfo={props.setToasterInfo}
             role={props.user.role}
             setReloadData={setReloadData}
            />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Locations</h1>
                <div className={DashboardStyles.rightContainer}>
                    <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace />
                    <Button type='plain' onClick={() => setShowModal(true)}>+ Add new Location</Button>
                </div>
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
                    showSearch
                    search={filters.searchKey}
                    setSearch={(val) => setFilters({ ...filters, searchKey: val })}
                    showFilter
                    filters={filters}
                    setFilters={setFilters}
                    setShowFilterModal={setShowFilterModal}
                />
            </DashboardCard>
        </>
    )

}

export default Locations;