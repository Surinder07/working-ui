import { useEffect, useState } from "react";
import styles from "../../../styles/pages/Dashboard.module.css";
import WaawHead from "../../../components/WaawHead";
import Button from "../../../components/Button";
import DashboardCard from "../../../components/dashboardComponents/DashboardCard";
import TabularInfo from "../../../components/dashboardComponents/TabularInfo";
import InviteUserModal from "../../../components/modals/InviteUserModal";

const Employees = (props) => {
  useEffect(() => {
    props.setPageInfo({
      authenticationRequired: false,
      pageView: "dashboard",
      activeMenu: "EMPLOYEES",
      activeSubMenu: "none",
    });
  }, []);
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const employees = [
    {
      Id: "6476475",
      "Employee Name": "Name",
      "Location Name": "Name",
      "Location Id": "Location Id",
      "Type of Employee": "01/29/2022",
      status: "xyz",
      Actions: "Not added",
    },
    {
      Id: "6476475",
      "Employee Name": "Name",
      "Location Name": "Name",
      "Location Id": "Location Id",
      "Type of Employee": "01/29/2022",
      status: "xyz",
      Actions: "Not added",
    },
    {
      Id: "6476475",
      "Employee Name": "Name",
      "Location Name": "Name",
      "Location Id": "Location Id",
      "Type of Employee": "01/29/2022",
      status: "xyz",
      Actions: "Not added",
    },
  ];

  return (
    <>
      <WaawHead title={"WaaW | Employees"} />
      <div className={styles.dashboardTitles}>
        <h1>Employees</h1>
        <Button type="plain" onClick={handleModalOpen}>
          + Invite Users
        </Button>
      </div>
      <DashboardCard style={{ marginTop: "20px" }}>
        <TabularInfo
          title="Employee Sheet"
          description="Tabular list Employee details."
          data={employees}
          pagination
          showSearch
        />
      </DashboardCard>
      <InviteUserModal setShowModal={setShowModal} showModal={showModal} />
    </>
  );
};

export default Employees;
