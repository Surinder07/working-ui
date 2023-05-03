import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo, CreditCardElement } from "../../../components";
import { paymentService } from "../../../services";
import { fetchAndHandlePage, getPaymentListing } from "../../../helpers";

const PaymentHistory = (props) => {
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [filters, setFilters] = useState({});
    const [sort, setsort] = useState({});
    // Payment Modal States
    const [payModal, setPayModal] = useState({ show: false })
    const [invoice, setInvoice] = useState('-');
    const [invoiceId, setInvoiceId] = useState('');
    const [description, setDescription] = useState('- x -');
    const [total, setTotal] = useState('0 CAD');

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "PAYMENT",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN"]);
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
            () => paymentService.getAllPayments(pageNo, pageSize, filters),
            setData,
            setTotalEntries,
            setTotalPages,
            props.setPageLoading,
            props.setToasterInfo,
            getPaymentListing,
            props.user.role
        );
    };

    const actions = [
        {
            key: "Pay",
            action: (id) => {
                paymentService.getById(id)
                    .then(res => {
                        props.setPageLoading(true);
                        if (!res.error) {
                            setInvoice(res.waawId);
                            setDescription(res.transactionType === 'PLATFORM_FEE' ?
                                `Platform fee x ${res.unitPrice}` : `Active Employees(${res.quantity} x ${res.currency} ${res.unitPrice})`);
                            setTotal(`${res.totalAmount} ${res.currency}`);
                            setInvoiceId(res.id);
                            setPayModal({ show: true });
                            props.setPageLoading(false);
                        }
                    })
            },
            condition: (status) => status === 'UNPAID',
        }
    ];

    return (
        <>
            <WaawNoIndexHead title="Payments" />
            {
                props.pageLoading ?
                    <></> :
                    <>
                        <CreditCardElement
                            type='payment'
                            invoiceId={invoiceId}
                            invoice={invoice}
                            description={description}
                            total={total}
                            setPageLoading={props.setPageLoading}
                            setToasterInfo={props.setToasterInfo}
                            setReloadData={setReloadData}
                            modal={payModal}
                            setModal={setPayModal}
                            showSavedCards
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
