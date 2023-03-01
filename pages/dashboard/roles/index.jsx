import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, NewRoleModal, DeleteModal, PaginationDropdown, RolesFilter } from "../../../components";
import { locationAndRoleService } from "../../../services";
import { fetchAndHandle, fetchAndHandlePage, getRoleListing } from "../../../helpers";

const Roles = (props) => {
    const [updateModal, setUpdateModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [data, setData] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const [editId, setEditId] = useState('');
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        id: '',
        show: false,
        message: 'This will permanently delete this role, make sure there are no dependencies on this role.',
        disableMessage: 'This will deactivate this role, make sure there are no dependencies on this role.',
        errorMessage: '',
        type: 'delete'
    })

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "ROLES",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(['ADMIN', 'MANAGER']);
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize, filters, sort]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        fetchAndHandlePage(() => locationAndRoleService.getAllRoles(pageNo, pageSize, filters, sort),
            setData, setTotalEntries, setTotalPages, props.setPageLoading, props.setToasterInfo,
            getRoleListing, props.user.role);
    }

    const deleteRole = () => {
        fetchAndHandle(() => locationAndRoleService.removeLocationRole(confirmDeleteModal.id),
            "Role Deleted Successfully", null, setReloadData, props.setPageLoading, null, null,
            props.setToasterInfo, null, (msg) => setConfirmDeleteModal({ ...confirmDeleteModal, errorMessage: msg }));
    }

    const toggleRoleActivity = (id) => {
        fetchAndHandle(() => locationAndRoleService.toggleActiveLocationRole(id ? id : confirmDeleteModal.id),
            "Role updated Successfully", null, setReloadData, props.setPageLoading, null, null,
            props.setToasterInfo, null, (msg) => setConfirmDeleteModal({ ...confirmDeleteModal, errorMessage: msg }));
    }

    const actions = [
        {
            key: "Edit Preferences",
            action: (id) => {
                props.setPageLoading(true);
                setEditId(id);
                setUpdateModal(true);
                setShowModal(true);
            },
            condition: (status) => true
        },
        {
            key: "activeToggle",
            action: (id, status) => {
                if (status === 'ACTIVE') setConfirmDeleteModal({ ...confirmDeleteModal, id: id, show: true, type: 'disable' });
                else toggleRoleActivity(id);
            },
            condition: (status) => true
        },
        {
            key: "Delete",
            action: (id) => setConfirmDeleteModal({ ...confirmDeleteModal, id: id, show: true, type: 'delete' }),
            condition: (status) => true
        },
    ];


    return (
        <>
            <WaawNoIndexHead title="Roles" />
            {
                props.pageLoading ? <></> :
                    <>
                        <DeleteModal
                            modal={confirmDeleteModal}
                            setModal={setConfirmDeleteModal}
                            onSubmit={confirmDeleteModal.type === 'delete' ? deleteRole : toggleRoleActivity}
                            disable={confirmDeleteModal.type === 'disable'}
                        />
                        <NewRoleModal
                            setShowModal={setShowModal}
                            showModal={showModal}
                            role={props.user.role}
                            setToasterInfo={props.setToasterInfo}
                            setReloadData={setReloadData}
                            update={updateModal}
                            id={editId}
                            setPageLoading={props.setPageLoading}
                        />
                        <RolesFilter
                            showModal={showFilterModal}
                            setShowModal={setShowFilterModal}
                            role={props.user.role}
                            filters={filters}
                            setFilters={setFilters}
                            setReloadData={setReloadData}
                            setToasterInfo={props.setToasterInfo}
                        />
                        <div className={DashboardStyles.dashboardTitles}>
                            <h1>Roles</h1>
                            <div className={DashboardStyles.rightContainer}>
                                <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace />
                                <Button type="plain" onClick={() => {
                                    setUpdateModal(false);
                                    setShowModal(true)
                                }}>
                                    + Add new Roles
                                </Button>
                            </div>
                        </div>
                        <DashboardCard style={{ marginTop: "20px" }}>
                            <TabularInfo
                                title="Roles"
                                description="Tabular list for current role."
                                data={data}
                                actions={actions}
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
                                setShowFilterModal={setShowFilterModal}
                            />
                        </DashboardCard>
                    </>
            }
        </>
    );
};

export default Roles;
