import {useEffect, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, DashboardCard, TabularInfo, ComingSoonEl} from "../../../components";

const invoices = [
    {
        invoiceId: "6476475",
        service: "One time register",
        startDate: "-",
        endDate: "-",
        billingDate: "01/29/2022",
        amount: "$960",
        status: "Paid",
    },
    {
        invoiceId: "6476475",
        service: "Monthly Fees",
        startDate: "01/01/2022",
        endDate: "02/01/2022",
        billingDate: "01/29/2022",
        amount: "$200",
        status: "Paid",
    },
    {
        invoiceId: "6476475",
        service: "Monthly Fees",
        startDate: "02/01/2022",
        endDate: "03/01/2022",
        billingDate: "02/29/2022",
        amount: "$250",
        status: "Due",
    },
];

const PaymentHistory = (props) => {
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);

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
            key: "View",
            action: (id) => console.log(`/dashboard/invoices/?id=${id}`),
            condition: (status) => true,
        },
        {
            key: "Deactivate",
            action: () => console.log("Api call will be added here"),
            condition: (status) => true,
        },
        {
            key: "Delete",
            action: () => console.log("Api call will be added here"),
            condition: (status) => true,
        },
    ];

    return (
        <>
            <WaawNoIndexHead title="Invoices" />
            {props.pageLoading ? (
                <></>
            ) : (
                <>
                    <div className={DashboardStyles.dashboardTitles}>
                        <h1>Payment History</h1>
                    </div>
                    <DashboardCard style={{marginTop: "20px"}}>
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
            )}
        </>
    );
};

export default PaymentHistory;
