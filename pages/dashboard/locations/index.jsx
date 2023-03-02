import {useEffect, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, Button, DashboardCard, TabularInfo, LocationModal, DeleteModal, LocationFilter} from "../../../components";
import {locationAndRoleService} from "../../../services";
import {PaginationDropdown} from "../../../components";
import {fetchAndHandle, fetchAndHandlePage, getLocationListing} from "../../../helpers";

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
        id: "",
        show: false,
        message: "This will permanently delete this location, make sure there are no dependencies on this location.",
        disableMessage: "This will deactivate this location, make sure there are no dependencies on this location.",
        errorMessage: "",
        type: "delete",
    });

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "LOCATIONS",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN"]);
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize, filters, sort]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData]);

    const fetchData = () => {
        fetchAndHandlePage(
            () => locationAndRoleService.getAllLocations(pageNo, pageSize, filters, sort),
            setData,
            setTotalEntries,
            setTotalPages,
            props.setPageLoading,
            props.setToasterInfo,
            getLocationListing,
            props.user.role
        );
    };

    const deleteLocation = () => {
        fetchAndHandle(
            () => locationAndRoleService.removeLocation(confirmDeleteModal.id),
            "Location Deleted Successfully",
            null,
            setReloadData,
            props.setPageLoading,
            null,
            null,
            props.setToasterInfo,
            null,
            (msg) => setConfirmDeleteModal({...confirmDeleteModal, errorMessage: msg})
        );
    };

    const toggleLocationActivity = (id) => {
        fetchAndHandle(
            () => locationAndRoleService.toggleActiveLocation(id ? id : confirmDeleteModal.id),
            "Location updated Successfully",
            null,
            setReloadData,
            props.setPageLoading,
            null,
            null,
            props.setToasterInfo,
            null,
            (msg) => setConfirmDeleteModal({...confirmDeleteModal, errorMessage: msg})
        );
    };

    const actions = [
        {
            key: "activeToggle",
            action: (id, status) => {
                if (status === "ACTIVE") setConfirmDeleteModal({...confirmDeleteModal, id: id, show: true, type: "disable"});
                else toggleRoleActivity(id);
            },
            condition: (status) => true,
        },
        {
            key: "Delete",
            action: (id) => setConfirmDeleteModal({...confirmDeleteModal, id: id, show: true, type: "delete"}),
            condition: (status) => true,
        },
    ];

    return (
        <>
            <WaawNoIndexHead title="Locations" />
            {props.pageLoading ? (
                <></>
            ) : (
                <>
                    <DeleteModal
                        modal={confirmDeleteModal}
                        setModal={setConfirmDeleteModal}
                        onSubmit={confirmDeleteModal.type === "delete" ? deleteLocation : toggleLocationActivity}
                        disable={confirmDeleteModal.type === "disable"}
                    >
                        This will permanently delete this Location and all associated Roles and Employees
                    </DeleteModal>
                    <LocationModal showModal={showModal} setShowModal={setShowModal} setToasterInfo={props.setToasterInfo} setReloadData={setReloadData} role={props.user.role} />
                    <LocationFilter setShowModal={setShowFilterModal} showModal={showFilterModal} setToasterInfo={props.setToasterInfo} setReloadData={setReloadData} setFilters={setFilters} />
                    <div className={DashboardStyles.dashboardTitles}>
                        <h1>Locations</h1>
                        <div className={DashboardStyles.rightContainer}>
                            <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace />
                            <Button type="plain" onClick={() => setShowModal(true)}>
                                + Add new Location
                            </Button>
                        </div>
                    </div>
                    <DashboardCard style={{marginTop: "20px"}}>
                        <TabularInfo
                            title="Location Listing"
                            description="Tabular list of all locations."
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
                            setSearch={(val) => setFilters({...filters, searchKey: val})}
                            showFilter
                            filters={filters}
                            setFilters={setFilters}
                            setShowFilterModal={setShowFilterModal}
                        />
                    </DashboardCard>
                </>
            )}
        </>
    );
};

export default Locations;
