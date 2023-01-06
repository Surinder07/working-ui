import { useEffect, useState } from "react";
import { DashboardCard, DeleteModal, NotificationFilter, PaginationDropdown, TabularInfo, WaawNoIndexHead } from "../../../components";
import { fetchAndHandle, fetchAndHandlePage, getNotificationListing } from "../../../helpers";
import { notificationService } from "../../../services/notification.service";
import { DashboardStyles } from "../../../styles/pages";

const Notifications = (props) => {
    const [showFilterModal, setShowFilterModal] = useState(false)
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
            activeMenu: "NOTIFICATIONS",
            activeSubMenu: "none",
        });
        props.setAllowedRoles('ADMIN', 'MANAGER', 'EMPLOYEE');
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize, filters, sort]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        fetchAndHandlePage(() => notificationService.getAll(pageNo, pageSize, filters, sort),
            setData, setTotalEntries, setTotalPages, props.setPageLoading, props.setToasterInfo,
            getNotificationListing, props.user.role);
    }

    const deleteNotification = () => {
        fetchAndHandle(() => notificationService.delete(confirmDeleteModal.id),
            "Notification Deleted Successfully", null, setReloadData, props.setPageLoading, null, null,
            props.setToasterInfo);
    }

    const actions = {
        key: 'Delete',
        action: (id) => setConfirmDeleteModal({ id: id, show: true })
    }

    const markAsRead = (id, status) => {
        if (status.text === 'Unread') {
            fetchAndHandle(() => notificationService.markAsRead(id), "", null, null, props.setPageLoading,
                null, null, null, () => {
                    let newData = data;
                    newData = newData.map(item => {
                        if (item.internalId === id) {
                            return {
                                ...item, status: {
                                    ...item.status,
                                    text: 'Read'
                                }
                            }
                        }
                        return item;
                    })
                    setData(newData);
                })
        }
    }

    const markAllAsRead = () => {
        fetchAndHandle(notificationService.markAllAsRead, "All notifications marked as read", null, setReloadData,
            props.setPageLoading, null, null, props.setToasterInfo, null);
    }

    return (
        <>
            <WaawNoIndexHead title='Notifications' />
            <NotificationFilter
                showModal={showFilterModal}
                setShowModal={setShowFilterModal}
                setToasterInfo={props.setToasterInfo}
                role={props.user.role}
                setReloadData={setReloadData}
            />
            <DeleteModal
                modal={confirmDeleteModal}
                setModal={setConfirmDeleteModal}
                onDelete={deleteNotification}
            >
                This will permanently delete this Notification
            </DeleteModal>
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Notifications</h1>
                <div className={DashboardStyles.rightContainer}>
                    <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace />
                    <p onClick={markAllAsRead}
                        style={{ fontSize: '12px', cursor: 'pointer', color: '#2996C3', margin: 0 }}>
                        Mark all as Read
                    </p>
                </div>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Notifications'
                    description='Tabular list of all your notifications.'
                    data={data}
                    actions={actions}
                    pagination
                    onExpand={markAsRead}
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
                    filters={filters}
                />
            </DashboardCard>
        </>
    )

}

export default Notifications;