import { useEffect } from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import WaawHead from "../../components/WaawHead";
import Button from "../../components/Button";
import DashboardCard from "../../components/dashboardComponents/DashboardCard";
import TabularInfo from "../../components/dashboardComponents/TabularInfo";

const Shifts = (props) => {
  useEffect(() => {
    props.setPageInfo({
      authenticationRequired: false,
      pageView: "dashboard",
      activeMenu: "SHFITS",
      activeSubMenu: "none",
    });
  }, []);

  const locations = [
    {
      ShiftId: "6476475",
      ShiftName: "One time register",
      StartDate: "-",
      EndDate: "-",
      LocationName: "01/29/2022",
      CreationDate: "$960",
      Status: "Paid",
      Actions: "",
    },
    {
      ShiftId: "6476475",
      ShiftName: "One time register",
      StartDate: "-",
      EndDate: "-",
      LocationName: "01/29/2022",
      CreationDate: "$960",
      Status: "Paid",
      Actions: "",
    },
    {
      ShiftId: "6476475",
      ShiftName: "One time register",
      StartDate: "-",
      EndDate: "-",
      LocationName: "01/29/2022",
      CreationDate: "$960",
      Status: "Paid",
      Actions: "",
    },
    {
      ShiftId: "6476475",
      ShiftName: "One time register",
      StartDate: "-",
      EndDate: "-",
      LocationName: "01/29/2022",
      CreationDate: "$960",
      Status: "Paid",
      Actions: "",
    },
    {
      ShiftId: "6476475",
      ShiftName: "One time register",
      StartDate: "-",
      EndDate: "-",
      LocationName: "01/29/2022",
      CreationDate: "$960",
      Status: "Paid",
      Actions: "",
    },
  ];

  return (
    <>
      <WaawHead title={"WaaW | Locations"} />
      <div className={styles.dashboardTitles}>
        <h1>Shifts</h1>
        <Button type="plain">+ Add new Location</Button>
      </div>
      <DashboardCard style={{ marginTop: "20px" }}>
        <TabularInfo title="Shift  details" description="Tabular list of the shift details.." data={locations} pagination expandable active={true} />
      </DashboardCard>
    </>
  );
};

export default Shifts;
