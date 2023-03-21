import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo, PaymentOptions } from "../../../components";

const PaymentHistory = (props) => {
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [payModal, setPayModal] = useState({
        show: false,
        invoiceId: ''
    })

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "PAYMENT",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN"]);
    }, []);

    const actions = [
        {
            key: "Pay",
            action: (id) => setPayModal({
                show: true,
                invoiceId: id
            }),
            condition: (status) => status === 'UNPAID',
        }
    ];

    return (
        <>
            <WaawNoIndexHead title="Invoices" />
            {
                props.pageLoading ?
                    <></> :
                    <>
                        <PaymentOptions
                            modal={payModal}
                            setModal={setPayModal}
                            setPageLoading={props.setPageLoading}
                            setReloadData={setReloadData}
                        />
                        <div className={DashboardStyles.dashboardTitles}>
                            <h1>Payment History</h1>
                        </div>
                        <DashboardCard style={{ marginTop: "20px" }}>
                            <TabularInfo
                                title="Payment History"
                                description="Tabular list of all payments with status."
                                data={data}
                                actions={actions}
                                screenType={props.screenType}
                                pagination
                                totalEntries={totalEntries}
                                pageSize={pageSize}
                                totalPages={totalPages}
                                pageNo={pageNo}
                                setPageNo={setPageNo}
                            />
                        </DashboardCard>
                    </>
            }
        </>
    );
};

export default PaymentHistory;
