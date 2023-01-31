import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, InviteUserModal, DeleteModal, PaginationDropdown, EmployeeFilter } from "../../../components";
import { memberService } from "../../../services";
import { getEmployeeListing, fetchAndHandle, fetchAndHandlePage } from '../../../helpers';

const Employees = (props) => {
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
    const router = useRouter();

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "EMPLOYEES",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(['ADMIN', 'MANAGER'])
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize, filters, sort]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData]);

    const fetchData = () => {
        fetchAndHandlePage(() => memberService.listAllUsers(pageNo, pageSize, filters),
            setData, setTotalEntries, setTotalPages, props.setPageLoading, props.setToasterInfo,
            getEmployeeListing, props.user.role);
    };

    const deleteUser = () => {
        fetchAndHandle(() => memberService.deleteMember(confirmDeleteModal.id), "User Deleted Successfully", null,
            setReloadData, props.setPageLoading, null, null, props.setToasterInfo);
    }

    const actions = [
        {
            key: "View",
            action: (id) => router.push(`/dashboard/employees/details?id=${id}`),
            condition: (status) => true
        },
        {
            key: "activeToggle",
            action: (id, status) => {
                if (status === 'INVITED') {
                    fetchAndHandle(() => memberService.resendInvite(id), "Invite was successfully resent", null,
                        setReloadData, props.setPageLoading, null, null, props.setToasterInfo);
                } else {
                    fetchAndHandle(() => memberService.toggleActiveMember(id), "User updated Successfully", null,
                        setReloadData, props.setPageLoading, null, null, props.setToasterInfo);
                }
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
            <WaawNoIndexHead title="Employees" />
            {
                props.pageLoading ? <></> :
                    <>
                        <DeleteModal
                            modal={confirmDeleteModal}
                            setModal={setConfirmDeleteModal}
                            onDelete={deleteUser}
                        >
                            This will permanently delete this User from your Organization
                        </DeleteModal>
                        <InviteUserModal
                            setShowModal={setShowModal}
                            showModal={showModal}
                            setToasterInfo={props.setToasterInfo}
                            setReloadData={setReloadData}
                            role={props.user.role}
                            setPageLoading={props.setPageLoading}
                        />
                        <EmployeeFilter
                            setShowModal={setShowFilterModal}
                            showModal={showFilterModal}
                            setToasterInfo={props.setToasterInfo}
                            role={props.user.role}
                            data={filters}
                            setData={setFilters}
                        />
                        <div className={DashboardStyles.dashboardTitles}>
                            <h1>Employees</h1>
                            <div className={DashboardStyles.rightContainer}>
                                <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace />
                                <Button type='plain' onClick={() => setShowModal(true)}>+ Invite Users</Button>
                            </div>
                        </div>
                        <DashboardCard style={{ marginTop: "20px" }} className={DashboardStyles.employeeCard}>
                            <TabularInfo
                                title="Employee Sheet"
                                description="Tabular list Employee details."
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

export default Employees;
