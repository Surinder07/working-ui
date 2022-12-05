import { useEffect } from "react";
import WaawHead from "../../components/WaawHead";
import styles from "../../styles/pages/Dashboard.module.css";
import InfoTileBanner from "../../components/dashboardComponents/InfoTileBanner";
import TabularInfo from "../../components/dashboardComponents/TabularInfo";
import DashboardCard from "../../components/dashboardComponents/DashboardCard";

const Dashboard = (props) => {
  useEffect(() => {
    props.setPageInfo({
      authenticationRequired: false,
      pageView: "dashboard",
      activeMenu: "DASHBOARD",
      activeSubMenu: "none",
    });
  }, []);

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

  return (
    <>
      <WaawHead title={"WaaW | Dashboard"} />
      <div className={styles.dashboardTitles}>
        <h1>Overview and Analytics</h1>
      </div>
      <InfoTileBanner />
      <DashboardCard style={{ marginTop: "20px" }} showOptions>
        <TabularInfo title="Invoices" description="Tabular list of all WAAW invoices with status." data={invoices} />
      </DashboardCard>
    </>
  );
};

export default Dashboard;
