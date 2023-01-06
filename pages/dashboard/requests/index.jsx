import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo, Button, RequestsFilter, CreateRequestModal, PaginationDropdown } from "../../../components";
import RequestsModal from "../../../components/modals/EditRequestModal";
import { fetchAndHandlePage, getRequestsListing, joinClasses } from "../../../helpers";
import { requestService } from "../../../services";

const Requests = (props) => {

    const [activeTable, setActiveTable] = useState('emp');
    const [editId, setEditId] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [data, setData] = useState();
    const [myData, setMyData] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [pageNoMyData, setPageNoMyData] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPagesMyData, setTotalPagesMyData] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [totalEntriesMyData, setTotalEntriesMyData] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({});

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "REQUESTS",
            activeSubMenu: "none",
        });
        props.setAllowedRoles['ADMIN', 'MANAGER', 'EMPLOYEE']
    }, []);

    useEffect(() => {
        if (props.user.role && props.user.role === 'ADMIN') {
            setActiveTable('emp')
        }
    }, [props.user])

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        if (props.user.role === 'ADMIN' || props.user.role === 'MANAGER') {
            fetchAndHandlePage(() => requestService.getAll(pageNo, pageSize, filters, sort),
                setData, setTotalEntries, setTotalPages, props.setPageLoading, props.setToasterInfo,
                getRequestsListing, props.user.role);
        }
        if (props.user.role === 'EMPLOYEE' || props.user.role === 'MANAGER') {
            fetchAndHandlePage(() => requestService.getAllForUser(pageNo, pageSize, filters, sort),
                setMyData, setTotalEntriesMyData, setTotalPagesMyData, props.setPageLoading, props.setToasterInfo,
                getRequestsListing, props.user.role);
        }
    }

    const actions = [
        {
            key: "Respond",
            action: (id, status) => {
                if (status !== 'ACCEPTED' || status !== 'DENIED') {
                    setEditId(id);
                    setShowEditModal(true);
                }
            }
        }
    ];


    return (
        <>
            <WaawNoIndexHead title={"Requests"} />
            <CreateRequestModal
                showModal={showAddModal}
                setShowModal={setShowAddModal}
                id={editId}
                setToasterInfo={props.setToasterInfo}
                role={props.user.role}
                setReloadData={setReloadData}
                setPageLoading={props.setPageLoading}
            />
            <RequestsModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                id={editId}
                setToasterInfo={props.setToasterInfo}
                role={props.user.role}
                tabularType={activeTable}
            />
            <RequestsFilter
                showModal={showFilterModal}
                setShowModal={setShowFilterModal}
                id={editId}
                setToasterInfo={props.setToasterInfo}
                role={props.user.role}
                setReloadData={setReloadData}
            />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Requests</h1>
                <div className={DashboardStyles.rightContainer}>
                    <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace={props.user.role !== 'ADMIN'} />
                    {
                        props.user.role !== "ADMIN" &&
                        <Button
                            onClick={() => setShowAddModal(true)}
                            type="plain"
                        >+ Create Request</Button>
                    }
                </div>
            </div>
            {
                (props.user.role && props.user.role === 'MANAGER') &&
                <div className={DashboardStyles.tableChoices}>
                    <p
                        onClick={() => { if (activeTable !== 'my') setActiveTable('my') }}
                        className={joinClasses(DashboardStyles.tableChoice, activeTable === 'my' && DashboardStyles.activeTableChoice)}>
                        My Requests
                    </p>
                    <p
                        onClick={() => { if (activeTable === 'my') setActiveTable('emp') }}
                        className={joinClasses(DashboardStyles.tableChoice, activeTable !== 'my' && DashboardStyles.activeTableChoice)}>
                        Employee Requests
                    </p>
                </div>
            }
            {
                activeTable !== 'my' &&
                <DashboardCard >
                    <TabularInfo
                        title="Request Details"
                        description="Tabular representation of all employee requests"
                        data={data}
                        actions={actions}
                        pagination
                        totalEntries={totalEntries}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        pageNo={pageNo}
                        setPageNo={setPageNo}
                        showSearch
                        // search={filters.searchKey}
                        setSearch={(val) => setFilters({ ...filters, searchKey: val })}
                        showFilter
                        // filters={filters}
                        // setFilters={setFilters}
                        setShowFilterModal={setShowFilterModal}
                    />
                </DashboardCard>
            }
            {
                activeTable === 'my' &&
                <DashboardCard >
                    <TabularInfo
                        title="Request Details"
                        description="Tabular representation of all my requests"
                        data={myData}
                        actions={actions}
                        pagination
                        totalEntries={totalEntriesMyData}
                        pageSize={pageSize}
                        totalPages={totalPagesMyData}
                        pageNo={pageNoMyData}
                        setPageNo={setPageNoMyData}
                        showFilter
                        // filters={filters}
                        // setFilters={setFilters}
                        setShowFilterModal={setShowFilterModal}
                    />
                </DashboardCard>
            }
        </>
    );
};

export default Requests;
