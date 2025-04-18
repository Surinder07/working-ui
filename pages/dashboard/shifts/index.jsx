import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import {
    WaawNoIndexHead,
    DashboardCard,
    TabularInfo,
    Button,
    NewShiftModal,
    ShiftsFilter,
    DeleteModal,
    PaginationDropdown,
    EditShiftTimesheetModal
} from "../../../components";
import {
    checkDateForPast,
    fetchAndHandle,
    fetchAndHandlePage,
    getShiftsListing,
    getSingleShiftsListing,
    joinClasses
} from "../../../helpers";
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
    const [showEditModal, setShowEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        id: "",
        show: false,
        type: '' // BATCH OR SINGLE
    });

    useEffect(() => {
        if (props.stompMsg.shift) {
            setReloadData(true);
            console.log(props.stompMsg)
            props.resetStompMsg('shift')
        }
    }, [props.stompMsg.shift])

    useEffect(() => {
        if (props.user.role && props.user.role === 'ADMIN') {
            setActiveTable('emp')
        } else if (props.user.role && props.user.role !== 'MANAGER') {
            setActiveTable('my');
        }
    }, [props.user])

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize, filters, sort]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData]);

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

    const deleteShiftOrBatch = () => {
        if (confirmDeleteModal.type === 'BATCH') {
            fetchAndHandle(() => shiftsService.deleteBatch(confirmDeleteModal.id),
                "Batch Deleted Successfully", null, setReloadData, props.setPageLoading, null, null,
                props.setToasterInfo);
        } else {
            fetchAndHandle(() => shiftsService.deleteShift(confirmDeleteModal.id),
                "Shift Deleted Successfully", null, setReloadData, props.setPageLoading, null, null,
                props.setToasterInfo);
        }
    }

    const releaseShiftOrBatch = (type, id) => {
        if (type === 'BATCH') {
            fetchAndHandle(() => shiftsService.releaseBatch(id),
                "Batch Released Successfully", null, setReloadData, props.setPageLoading, null, null,
                props.setToasterInfo);
        } else {
            fetchAndHandle(() => shiftsService.releaseShift(id),
                "Shift Released Successfully", null, setReloadData, props.setPageLoading, null, null,
                props.setToasterInfo);
        }
    }

    const actions = [
        {
            key: "Delete Batch",
            action: (id) => {
                setConfirmDeleteModal({
                    id: id,
                    show: true,
                    type: 'BATCH'
                })
            },
            condition: (status, date) => checkDateForPast(date)
        },
        {
            key: "Release",
            action: (id) => releaseShiftOrBatch("BATCH", id),
            condition: (status, date) => status === 'CREATED' && checkDateForPast(date)
        }
    ];

    const subTableActions = [
        {
            key: "Edit",
            action: (id) => {
                setEditId(id);
                setShowEditModal(true);
            },
            condition: (status, date) => activeTable === 'emp' && checkDateForPast(date)
        },
        {
            key: "Delete",
            action: (id) => {
                setConfirmDeleteModal({
                    id: id,
                    show: true,
                    type: 'SINGLE'
                })
            },
            condition: (status, date) => checkDateForPast(date)
        },
        {
            key: "Release",
            action: (id) => releaseShiftOrBatch("SHIFT", id),
            condition: (status, date) => status === 'ASSIGNED' && checkDateForPast(date)
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
                            onSubmit={deleteShiftOrBatch}
                        >
                            This will permanently delete this Shift/Batch
                        </DeleteModal>
                        <NewShiftModal
                            setShowModal={setShowAddModal}
                            showModal={showAddModal}
                            buttonText="CreateShift"
                            setToasterInfo={props.setToasterInfo}
                            setReloadData={setReloadData}
                            role={props.user.role}
                            timezone={props.user.organizationTimezone}
                            setPageLoading={props.setPageLoading}
                        />
                        <ShiftsFilter
                            filters={filters}
                            setFilters={setFilters}
                            setShowModal={setShowFilterModal}
                            showModal={showFilterModal}
                            setToasterInfo={props.setToasterInfo}
                            role={props.user.role}
                        />
                        <EditShiftTimesheetModal
                            type='Shift'
                            showModal={showEditModal}
                            setShowModal={setShowEditModal}
                            setPageLoading={props.setPageLoading}
                            setToasterInfo={props.setToasterInfo}
                            setReloadData={setReloadData}
                            id={editId}
                        />
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
                                    screenType={props.screenType}
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
                                    pagination
                                    screenType={props.screenType}
                                    totalEntries={totalEntriesMyShift}
                                    pageSize={pageSize}
                                    totalPages={totalPagesMyShift}
                                    pageNo={pageNoMyShift}
                                    setPageNo={setPageNoMyShift}
                                // showFilter
                                // filters={filters}
                                // setFilters={setFilters}
                                // setShowFilterModal={setShowFilterModal}
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
