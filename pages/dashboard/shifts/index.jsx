import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo, Button, NewShiftModal, ShiftsFilter, ShiftModal, DeleteModal, PaginationDropdown } from "../../../components";
import { fetchAndHandlePage, getShiftsListing, getSingleShiftsListing, joinClasses } from "../../../helpers";
import { shiftsService } from "../../../services";

const Shifts = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "SHIFTS",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["EMPLOYEE", "MANAGER", "ADMIN"]);
    }, []);

    const [activeTable, setActiveTable] = useState('emp');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [data, setData] = useState();
    const [myShiftData, setMyShiftData] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [pageNoMyShift, setPageNoMyShift] = useState(1);
    const [totalPagesMyShift, setTotalPagesMyShift] = useState(1);
    const [totalEntriesMyShift, setTotalEntriesMyShift] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({});
    const [showShiftModal, setShowShiftModal] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        id: "",
        show: false,
        type: '' // BATCH OR SINGLE
    });

    useEffect(() => {
        if (props.user.role && props.user.role === 'ADMIN') {
            setActiveTable('emp')
        }
    }, [props.user])

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize, filters, sort]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        if (props.user.role === 'ADMIN' || props.user.role === 'MANAGER') {
            fetchAndHandlePage(() => shiftsService.getAll(pageNo, pageSize, filters, sort),
                setData, setTotalEntries, setTotalPages, props.setPageLoading, props.setToasterInfo,
                getShiftsListing, props.user.role);
        }
        if (props.user.role === 'EMPLOYEE' || props.user.role === 'MANAGER') {
            fetchAndHandlePage(() => shiftsService.getByUser(pageNoMyShift, pageSize, filters, sort),
                setMyShiftData, setTotalEntriesMyShift, setTotalPagesMyShift, props.setPageLoading,
                props.setToasterInfo, getSingleShiftsListing, props.user.role);
        }
    }

    const actions = [
        {
            key: "Delete Batch",
            action: (id) => console.log(`/dashboard/shifts/?id=${id}`),
            condition: (status) => true
        },
        {
            key: "Release",
            action: (id, status) => console.log("Api call will be added here"),
            condition: (status) => status === 'CREATED'
        }
    ];

    const subTableActions = [
        // {
        //     key: "Edit",
        //     action: (id) => console.log(`/dashboard/shifts/?id=${id}`),
        // },
        {
            key: "Delete",
            action: (id) => console.log("Api call will be added here"),
            condition: (status) => true
        },
        {
            key: "Release",
            action: (id,) => console.log("Api call will be added here"),
            condition: (status) => status === 'ASSIGNED'
        }
    ];

    return (
        <>
            <WaawNoIndexHead title="Shifts" />
            {
                props.pageLoading ? <></> :
                    <>
                        <DeleteModal
                            modal={confirmDeleteModal}
                            setModal={setConfirmDeleteModal}
                        // onDelete={deleteRole}
                        >
                            This will permanently delete this Shift
                        </DeleteModal>
                        <NewShiftModal
                            setShowModal={setShowAddModal}
                            showModal={showAddModal}
                            buttonText="CreateShift"
                            setToasterInfo={props.setToasterInfo}
                            setReloadData={setReloadData}
                            role={props.user.role}
                            setPageLoading={props.setPageLoading}
                        />
                        <ShiftsFilter setShowModal={setShowFilterModal} showModal={showFilterModal} setToasterInfo={props.setToasterInfo} role={props.user.role} setReloadData={setReloadData} />
                        <div className={DashboardStyles.dashboardTitles}>
                            <h1>Shifts</h1>
                            <div className={DashboardStyles.rightContainer}>
                                <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace={props.user.role === "MANAGER" || props.user.role === "ADMIN"} />
                                {(props.user.role === "MANAGER" || props.user.role === "ADMIN") && (
                                    <Button
                                        type="plain"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        + Create new Shifts
                                    </Button>
                                )}
                            </div>
                        </div>
                        {
                            (props.user.role && props.user.role === 'MANAGER') &&
                            <div className={DashboardStyles.tableChoices}>
                                <p
                                    onClick={() => { if (activeTable !== 'my') setActiveTable('my') }}
                                    className={joinClasses(DashboardStyles.tableChoice, activeTable === 'my' && DashboardStyles.activeTableChoice)}>
                                    My Shifts
                                </p>
                                <p
                                    onClick={() => { if (activeTable === 'my') setActiveTable('emp') }}
                                    className={joinClasses(DashboardStyles.tableChoice, activeTable !== 'my' && DashboardStyles.activeTableChoice)}>
                                    Employee Shifts
                                </p>
                            </div>
                        }
                        {
                            activeTable !== 'my' &&
                            <DashboardCard >
                                <TabularInfo
                                    title="Shifts"
                                    description="Tabular list of all Employee Shifts."
                                    data={data}
                                    actions={actions}
                                    subActions={subTableActions}
                                    pagination
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
                        }
                        {
                            activeTable === 'my' &&
                            <DashboardCard >
                                <TabularInfo
                                    title="Shifts"
                                    description="Tabular list of my Shifts."
                                    data={myShiftData}
                                    actions={actions}
                                    pagination
                                    totalEntries={totalEntriesMyShift}
                                    pageSize={pageSize}
                                    totalPages={totalPagesMyShift}
                                    pageNo={pageNoMyShift}
                                    setPageNo={setPageNoMyShift}
                                    showFilter
                                    filters={filters}
                                    setFilters={setFilters}
                                    setShowFilterModal={setShowFilterModal}
                                />
                            </DashboardCard>
                        }
                        {showShiftModal && <ShiftModal />}
                    </>
            }
        </>
    );
};

export default Shifts;
