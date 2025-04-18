import {useEffect, useState} from "react";
import {DashboardCard, DeleteModal, NotificationFilter, PaginationDropdown, TabularInfo, WaawNoIndexHead} from "../../../components";
import {fetchAndHandle, fetchAndHandlePage, getNotificationListing} from "../../../helpers";
import {notificationService} from "../../../services";
import {DashboardStyles} from "../../../styles/pages";

const Notifications = (props) => {
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
        message: "This will permanately delete this notification",
        errorMessage: "",
        type: "delete",
    });

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "NOTIFICATIONS",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN", "MANAGER", "EMPLOYEE"]);
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
            () => notificationService.getAll(pageNo, pageSize, filters, sort),
            setData,
            setTotalEntries,
            setTotalPages,
            props.setPageLoading,
            props.setToasterInfo,
            getNotificationListing,
            props.user.role
        );
    };

    const deleteNotification = () => {
        fetchAndHandle(() => notificationService.delete(confirmDeleteModal.id), "Notification Deleted Successfully", null, setReloadData, props.setPageLoading, null, null, props.setToasterInfo);
    };

    const actions = {
        key: "Delete",
        action: (id) => setConfirmDeleteModal({...confirmDeleteModal, id: id, show: true}),
    };

    const markAsRead = (id, status) => {
        if (status === "Unread") {
            console.log("reached", status);
            fetchAndHandle(
                () => notificationService.markAsRead(id),
                "",
                null,
                null,
                props.setPageLoading,
                null,
                null,
                null,
                () => {
                    let newData = data;
                    newData = newData.map((item) => {
                        if (item.internalId === id) {
                            return {
                                ...item,
                                status: {
                                    ...item.status,
                                    text: "Read",
                                    status: "ok",
                                },
                            };
                        }
                        return item;
                    });
                    setData(newData);
                }
            );
        }
    };

    const markAllAsRead = () => {
        fetchAndHandle(notificationService.markAllAsRead, "All notifications marked as read", null, setReloadData, props.setPageLoading, null, null, props.setToasterInfo, null);
    };

    return (
        <>
            <WaawNoIndexHead title="Notifications" />
            {props.pageLoading ? (
                <></>
            ) : (
                <>
                    <NotificationFilter showModal={showFilterModal} setShowModal={setShowFilterModal} filters={filters} setFilters={setFilters} />
                    <DeleteModal modal={confirmDeleteModal} setModal={setConfirmDeleteModal} onSubmit={deleteNotification} />
                    <div className={DashboardStyles.dashboardTitles}>
                        <h1>Notifications</h1>
                        <div className={DashboardStyles.rightContainer}>
                            <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace />
                            <p onClick={markAllAsRead} style={{fontSize: "12px", cursor: "pointer", color: "#2996C3", margin: 0}}>
                                Mark all as Read
                            </p>
                        </div>
                    </div>
                    <DashboardCard style={{marginTop: "20px"}}>
                        <TabularInfo
                            title="Notifications"
                            description="Tabular list of all your notifications."
                            data={data}
                            actions={actions}
                            pagination
                            onExpand={markAsRead}
                            screenType={props.screenType}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            totalPages={totalPages}
                            pageNo={pageNo}
                            setPageNo={setPageNo}
                            showFilter
                            setShowFilterModal={setShowFilterModal}
                        />
                    </DashboardCard>
                </>
            )}
        </>
    );
};

export default Notifications;
