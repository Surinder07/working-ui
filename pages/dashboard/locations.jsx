import { useEffect } from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import WaawHead from "../../components/WaawHead";
import Button from "../../components/Button";
import DashboardCard from "../../components/dashboardComponents/DashboardCard";
import TabularInfo from "../../components/dashboardComponents/TabularInfo";

const Locations = (props) => {
  useEffect(() => {
    props.setPageInfo({
      authenticationRequired: false,
      pageView: "dashboard",
      activeMenu: "LOCATIONS",
      activeSubMenu: "none",
    });
  }, []);

  const locations = [
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
      <WaawHead title={"WaaW | Locations"} />
      <div className={styles.dashboardTitles}>
        <h1>Locations</h1>
        <Button type="plain">+ Add new Location</Button>
      </div>
      <DashboardCard style={{ marginTop: "20px" }}>
        <TabularInfo title="Location Listing" description="Tabular list of all Locations." data={locations} pagination />
      </DashboardCard>
    </>
  );
};

export default Locations;
