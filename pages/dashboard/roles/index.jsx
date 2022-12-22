import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, NewRoleModal, DeleteModal, PaginationDropdown } from "../../../components";
import { locationAndRoleService } from "../../../services";

const Roles = (props) => {
    const [updateModal, setUpdateModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [editId, setEditId] = useState('');
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        id: '',
        show: false
    })

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "ROLES",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(['ADMIN', 'MANAGER'])
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        if (props.user) {
            props.setPageLoading(true);
            locationAndRoleService.getAllRoles(pageNo, pageSize)
                .then(res => {
                    if (res.error) {
                        props.setToasterInfo({
                            error: true,
                            title: "Error!",
                            message: res.message,
                        })
                    } else {
                        setData(res.data.map(role => {
                            return props.user.role === 'ADMIN' ? {
                                internalId: role.id,
                                id: role.waawId,
                                roleName: role.name,
                                location: role.location,
                                creationDate: role.creationDate,
                                createdBy: role.createdBy,
                                status: {
                                    text: role.active ? 'ACTIVE' : 'DISABLED',
                                    displayType: 'bg',
                                    status: role.active ? 'ok' : 'bad'
                                }
                            } : {
                                internalId: role.id,
                                id: role.waawId,
                                roleName: role.name,
                                creationDate: role.creationDate,
                                createdBy: role.createdBy,
                                status: {
                                    text: role.active ? 'ACTIVE' : 'DISABLED',
                                    displayType: 'bg',
                                    status: role.active ? 'ok' : 'bad'
                                }
                            }
                        }));
                        setTotalEntries(res.totalEntries);
                        setTotalPages(res.totalPages);
                    }
                    props.setPageLoading(false);
                })
        }
    }

    const handleResponse = (apiResponse, successMessage) => {
        if (apiResponse.error) {
            props.setToasterInfo({
                error: true,
                title: "Error!",
                message: apiResponse.message,
            })
        } else {
            props.setToasterInfo({
                error: false,
                title: "Success!",
                message: successMessage,
            })
            setReloadData(true);
        }
    }

    const deleteRole = () => {
        props.setPageLoading(true);
        locationAndRoleService.removeLocationRole(confirmDeleteModal.id)
            .then(res => {
                handleResponse(res, "Role Deleted Successfully")
            })
        props.setPageLoading(false);
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
        },
        {
            key: "activeToggle",
            action: (id) => {
                props.setPageLoading(true);
                locationAndRoleService.toggleActiveLocationRole(id)
                    .then(res => {
                        handleResponse(res, "Role updated Successfully")
                    });
                props.setPageLoading(false);
            },
        },
        {
            key: "Delete",
            action: (id) => setConfirmDeleteModal({ id: id, show: true }),
        },
    ];


    return (
        <>
            <WaawNoIndexHead title="Roles" />
            <DeleteModal
                modal={confirmDeleteModal}
                setModal={setConfirmDeleteModal}
                onDelete={deleteRole}
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
                />
            </DashboardCard>
        </>
    );
};

export default Roles;
