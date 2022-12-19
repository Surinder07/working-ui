import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, InviteUserModal } from "../../../components";
import { memberService } from "../../../services";

const Employees = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const router = useRouter();

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "EMPLOYEES",
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

    const getStatus = (status) => {
        if (status === 'PAID_AND_ACTIVE')
            return { text: 'ACTIVE', displayType: 'bg', status: 'ok' };
        else if (status === 'PROFILE_PENDING')
            return { text: 'INCOMPLETE', displayType: 'bg', status: 'warn' };
        else if (status === 'DISABLED')
            return { text: 'INACTIVE', displayType: 'bg', status: 'bad' }
    }

    const fetchData = () => {
        memberService.listAllUsers(pageNo, pageSize, null)
            .then(res => {
                if (res.error) {
                    console.log(res.message);
                } else {
                    setData(res.data.map(user => {
                        return {
                            internalId: user.id,
                            id: user.waawId,
                            employeeName: user.fullName,
                            email: user.email,
                            location: user.location,
                            role: user.role,
                            employeeType: user.fullTime ? 'Full Time' : 'Contractor',
                            lastLogin: user.lastLogin,
                            status: getStatus(user.status)
                        }
                    }));
                    setTotalEntries(res.totalEntries);
                    setTotalPages(res.totalPages);
                }
            })
    }

    const actions = [
        {
            key: "View",
            action: (id) => router.push(`/dashboard/employees/details?id=${id}`),
        },
        {
            key: "Deactivate",
            action: () => console.log("Api call will be added here"),
        },
        {
            key: "Delete",
            action: () => console.log("Api call will be added here"),
        },
    ];

    return (
        <>
            <WaawNoIndexHead title="Employees" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Employees</h1>
                {(props.user.role === "MANAGER" || props.user.role === "ADMIN") && (
                    <Button type="plain" onClick={() => setShowModal(true)}>
                        + Invite Users
                    </Button>
                )}
            </div>
            <DashboardCard style={{ marginTop: "20px" }}>
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
                    showFilter />
            </DashboardCard>
            <InviteUserModal setShowModal={setShowModal} showModal={showModal} setToasterInfo={props.setToasterInfo} role={props.user.role} />
        </>
    );
};

export default Employees;
