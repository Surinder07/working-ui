import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, NewRoleModal } from "../../../components";
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
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        locationAndRoleService.getAllRoles(pageNo, pageSize)
            .then(res => {
                if (res.error) {
                    console.log(res.message);
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
                                text: role.active ? 'Active' : 'Disabled',
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
                                text: role.active ? 'Active' : 'Disabled',
                                displayType: 'bg',
                                status: role.active ? 'ok' : 'bad'
                            }
                        }
                    }));
                    setTotalEntries(res.totalEntries);
                    setTotalPages(res.totalPages);
                }
            })
    }

    const actions = [
        {
            key: "Edit",
            action: (id) => {
                setUpdateModal(true);
                setShowModal(true);
            },
        },
        {
            key: "activeToggle",
            action: (id) => console.log("Api call will be added here"),
        },
        {
            key: "Delete",
            action: (id) => setConfirmDeleteModal({id: id, show: true}),
        },
    ];


    return (
        <>
            <WaawNoIndexHead title="Roles" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Roles</h1>
                {(props.user.role === "MANAGER" || props.user.role === "ADMIN") && (
                    <Button type="plain" onClick={() => {
                        setUpdateModal(false);
                        setShowModal(true)
                    }}>
                        + Add new Roles
                    </Button>
                )}
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
            <NewRoleModal
                setShowModal={setShowModal}
                showModal={showModal}
                role={props.user.role}
                setToasterInfo={props.setToasterInfo}
                update={updateModal}
            />
        </>
    );
};

export default Roles;
