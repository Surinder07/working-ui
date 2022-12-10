import { useEffect } from "react";
import styles from '../../../styles/pages/Dashboard.module.css';
import WaawHead from "../../../components/WaawHead";
import DashboardCard from "../../../components/dashboardComponents/DashboardCard";
import TabularInfo from "../../../components/dashboardComponents/TabularInfo";

const Invoices = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'dashboard',
            activeMenu: 'INVOICES',
            activeSubMenu: 'none'
        })
    }, []);

    const actions = [
        {
          key: "View",
          action: (id) => console.log(`/dashboard/invoices/?id=${id}`),
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


    const invoices = [
        {
            invoiceId: '6476475',
            service: 'One time register',
            startDate: '-',
            endDate: '-',
            billingDate: '01/29/2022',
            amount: '$960',
            status: 'Paid',
        },
        {
            invoiceId: '6476475',
            service: 'Monthly Fees',
            startDate: '01/01/2022',
            endDate: '02/01/2022',
            billingDate: '01/29/2022',
            amount: '$200',
            status: 'Paid',
        },
        {
            invoiceId: '6476475',
            service: 'Monthly Fees',
            startDate: '02/01/2022',
            endDate: '03/01/2022',
            billingDate: '02/29/2022',
            amount: '$250',
            status: 'Due',
        }
    ]

    return (
        <>
            <WaawHead title={"WaaW | Invoices"} />
            <div className={styles.dashboardTitles}>
                <h1>Invoices</h1>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo 
                title='Invoices' 
                description='Tabular list of all current invoices status.' 
                data={invoices}
                actions={actions}
                pagination
                />
            </DashboardCard>
        </>
    )

}

export default Invoices;