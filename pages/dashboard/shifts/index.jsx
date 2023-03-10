import {useEffect, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, DashboardCard, TabularInfo, Button, NewShiftModal, ShiftsFilter, ShiftModal, DeleteModal, PaginationDropdown} from "../../../components";
import {checkDateForPast, fetchAndHandle, fetchAndHandlePage, fetchWrapper, getShiftsListing, getSingleShiftsListing, joinClasses, secureLocalStorage} from "../../../helpers";
import {shiftsService, userService} from "../../../services";
import SockJsClient from "react-stomp";

const webSocketEndpoints = process.env.endpoints.webSocket;

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

    const [activeTable, setActiveTable] = useState("emp");
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
        type: "", // BATCH OR SINGLE
    });

    const infoData = [
        {
            internalId: 1,
            shiftId: 25999,
            shiftName: "xyz",
            shiftValue: "xyz",
            startDate: "2015-2-10",
            endDate: "2015-2-13",
            status: "active",
            subData: [
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
            ],
        },
        {
            internalId: 2,
            shiftId: 25999,
            shiftName: "xyz",
            shiftValue: "xyz",
            startDate: "2015-2-10",
            endDate: "2015-2-13",
            status: "active",
            subData: [
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
            ],
        },
        {
            internalId: 3,
            shiftId: 25999,
            shiftName: "xyz",
            shiftValue: "xyz",
            startDate: "2015-2-10",
            endDate: "2015-2-13",
            status: "active",
            subData: [
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
            ],
        },
        {
            internalId: 4,
            shiftId: 25999,
            shiftName: "xyz",
            shiftValue: "xyz",
            startDate: "2015-2-10",
            endDate: "2015-2-13",
            status: "active",
            subData: [
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
            ],
        },
        {
            internalId: 5,
            shiftId: 25999,
            shiftName: "xyz",
            shiftValue: "xyz",
            startDate: "2015-2-10",
            endDate: "2015-2-13",
            status: "active",
            subData: [
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
                {internalId: 1, shiftId: 25999, shiftName: "xyz", shiftValue: "xyz", startDate: "2015-2-10", endDate: "2015-2-13", status: "active"},
            ],
        },
    ];

    useEffect(() => {
        if (props.user.role && props.user.role === "ADMIN") {
            setActiveTable("emp");
        } else if (props.user.role && props.user.role !== "MANAGER") {
            setActiveTable("my");
        }
    }, [props.user]);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize, filters, sort]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData]);

    const fetchData = () => {
        if (props.user.role === "ADMIN" || props.user.role === "MANAGER") {
            fetchAndHandlePage(
                () => shiftsService.getAll(pageNo, pageSize, filters, sort),
                setData,
                setTotalEntries,
                setTotalPages,
                props.setPageLoading,
                props.setToasterInfo,
                getShiftsListing,
                props.user.role
            );
        }
        if (props.user.role === "EMPLOYEE" || props.user.role === "MANAGER") {
            fetchAndHandlePage(
                () => shiftsService.getByUser(pageNoMyShift, pageSize, filters, sort),
                setMyShiftData,
                setTotalEntriesMyShift,
                setTotalPagesMyShift,
                props.setPageLoading,
                props.setToasterInfo,
                getSingleShiftsListing,
                props.user.role
            );
        }
    };

    const deleteShiftOrBatch = () => {
        console.log(confirmDeleteModal);
        // return;
        if (confirmDeleteModal.type === "BATCH") {
            fetchAndHandle(() => shiftsService.deleteBatch(confirmDeleteModal.id), "Batch Deleted Successfully", null, setReloadData, props.setPageLoading, null, null, props.setToasterInfo);
        } else {
            fetchAndHandle(() => shiftsService.deleteShift(confirmDeleteModal.id), "Shift Deleted Successfully", null, setReloadData, props.setPageLoading, null, null, props.setToasterInfo);
        }
    };

    const releaseShiftOrBatch = (type, id) => {
        if (type === "BATCH") {
            fetchAndHandle(() => shiftsService.releaseBatch(id), "Batch Released Successfully", null, setReloadData, props.setPageLoading, null, null, props.setToasterInfo);
        } else {
            fetchAndHandle(() => shiftsService.releaseShift(id), "Shift Released Successfully", null, setReloadData, props.setPageLoading, null, null, props.setToasterInfo);
        }
    };

    const actions = [
        {
            key: "Delete Batch",
            action: (id) => {
                setConfirmDeleteModal({
                    id: id,
                    show: true,
                    type: "BATCH",
                });
            },
            condition: (status, date) => checkDateForPast(date),
        },
        {
            key: "Release",
            action: (id) => releaseShiftOrBatch("BATCH", id),
            condition: (status, date) => status === "CREATED" && checkDateForPast(date),
        },
    ];

    return (
        <>
            <WaawNoIndexHead title="Shifts" />
            {props.pageLoading ? (
                <></>
            ) : (
                <>
                    <SockJsClient
                        url={fetchWrapper.getApiUrl(webSocketEndpoints.endpoint).replace("api/", "")}
                        headers={{access_token: props.token}}
                        topics={[webSocketEndpoints.topics.shift]}
                        onConnect={() => {
                            console.log("Connected to Websocket");
                        }}
                        onDisconnect={() => {
                            console.log("Disconnected from Websocket");
                        }}
                        onMessage={(msg) => {
                            setReloadData(true);
                        }}
                        options={{headers: {access_token: props.token}}}
                        debug={false}
                    />
                    <DeleteModal modal={confirmDeleteModal} setModal={setConfirmDeleteModal} onSubmit={deleteShiftOrBatch}>
                        This will permanently delete this Shift/Batch
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
                    <ShiftsFilter
                        filters={filters}
                        setFilters={setFilters}
                        setShowModal={setShowFilterModal}
                        showModal={showFilterModal}
                        setToasterInfo={props.setToasterInfo}
                        role={props.user.role}
                    />
                    <div className={DashboardStyles.dashboardTitles}>
                        <h1>Shifts</h1>
                        <div className={DashboardStyles.rightContainer}>
                            <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace={props.user.role === "MANAGER" || props.user.role === "ADMIN"} />
                            {(props.user.role === "MANAGER" || props.user.role === "ADMIN") && (
                                <Button type="plain" onClick={() => setShowAddModal(true)}>
                                    + Create new Shifts
                                </Button>
                            )}
                        </div>
                    </div>
                    {props.user.role && props.user.role === "MANAGER" && (
                        <div className={DashboardStyles.tableChoices}>
                            <p
                                onClick={() => {
                                    if (activeTable !== "my") setActiveTable("my");
                                }}
                                className={joinClasses(DashboardStyles.tableChoice, activeTable === "my" && DashboardStyles.activeTableChoice)}
                            >
                                My Shifts
                            </p>
                            <p
                                onClick={() => {
                                    if (activeTable === "my") setActiveTable("emp");
                                }}
                                className={joinClasses(DashboardStyles.tableChoice, activeTable !== "my" && DashboardStyles.activeTableChoice)}
                            >
                                Employee Shifts
                            </p>
                        </div>
                    )}
                    {activeTable !== "my" && (
                        <DashboardCard>
                            <TabularInfo
                                title="Shifts"
                                description="Tabular list of all Employee Shifts."
                                data={infoData}
                                actions={actions}
                                // subActions={subTableActions}
                                screenType={props.screenType}
                                pagination
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
                    )}
                    {activeTable === "my" && (
                        <DashboardCard>
                            <TabularInfo
                                title="Shifts"
                                description="Tabular list of my Shifts."
                                data={myShiftData}
                                pagination
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
                    )}
                </>
            )}
        </>
    );
};

export default Shifts;
