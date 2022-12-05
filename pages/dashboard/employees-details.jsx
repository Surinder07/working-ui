import { useEffect, useState } from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import WaawHead from "../../components/WaawHead";
import Accordion from "../../components/dashboardComponents/Accordion";

const Employees = (props) => {
  useEffect(() => {
    props.setPageInfo({
      authenticationRequired: false,
      pageView: "dashboard",
      activeMenu: "EMPLOYEES",
      activeSubMenu: "none",
    });
  }, []);

  const faqs = [
    {
      question: "Preferences",
      searchBar: false,
      filterBar: false,
      tableContent: [
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
      ],
    },
    {
      question: "Shifts",
      searchBar: true,
      filterBar: true,
      tableContent: [
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
      ],
    },
    {
      question: "Requests",
      searchBar: true,
      filterBar: true,
      tableContent: [
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
      ],
    },
    {
      question: "Attendance",
      searchBar: true,
      filterBar: true,
      tableContent: [
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
        {
          ShiftDate: "6476475",
          ShiftName: "One time register",
          StartTime: "-",
          EndTime: "-",
          WorkingHours: "01/29/2022",
          Status: "$960",
          Comments: "Paid",
        },
      ],
    },
  ];

  const [clicked, setClicked] = useState("0");

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  return (
    <>
      <WaawHead title={"WaaW | Employees"} />
      <div className={styles.dashboardTitles}>
        <h1>Personal details</h1>
      </div>
      <ul className={styles.accordion}>
        {faqs.map((faq, index) => (
          <Accordion onToggle={() => handleToggle(index)} active={clicked === index} key={index} faq={faq} />
        ))}
      </ul>
    </>
  );
};

export default Employees;
