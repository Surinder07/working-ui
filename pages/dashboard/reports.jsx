import { useEffect, useState } from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import WaawHead from "../../components/WaawHead";
import Accordion from "../../components/dashboardComponents/Accordion";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "../../components/Button";
import Modal from "../../components/modals/Modal";
import styleshere from "../../styles/elements/Modal.module.css";
import DropDown from "../../components/inputComponents/DropDown";

const Reports = (props) => {
  useEffect(() => {
    props.setPageInfo({
      authenticationRequired: false,
      pageView: "dashboard",
      activeMenu: "REPORTS",
      activeSubMenu: "none",
    });
  }, []);

  const faqs = [
    {
      question: "Payroll",
      searchBar: false,
      filterBar: false,
      pagination: false,
      tableContent: [
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
      ],
    },
    {
      question: "Attendance",
      searchBar: true,
      filterBar: true,
      pagination: true,
      tableContent: [
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
        {
          Id: "65435344",
          from: "01/30/2022",
          till: "02/28/2022",
          location: "Canada",
          "": <DownloadIcon style={{ color: "#2996C3" }} />,
        },
      ],
    },
  ];

  const locationname = ["Canada", "India", "United States"];

  const [clicked, setClicked] = useState("0");
  const [showModal, setShowModal] = useState(true);
  const buttonText = ["Submit", "Cancel"];

  const handleModal = () => {
    setShowModal(true);
  };

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  return (
    <>
      <WaawHead title={"WaaW | Reports"} />
      <div className={styles.dashboardTitles}>
        <h1>Reports</h1>
        <Button type="plain" onClick={handleModal}>
          + Generate Payroll / Attendance
        </Button>
      </div>
      <ul className={styles.accordion}>
        {faqs.map((faq, index) => (
          <Accordion
            onToggle={() => handleToggle(index)}
            active={clicked === index}
            key={index}
            faq={faq}
          />
        ))}
      </ul>

      <Modal
        size="small"
        setShowModal={setShowModal}
        showModal={showModal}
        buttonText={buttonText}
      >
        <div className={styleshere.smallModalMainContainer}>
          <div className={styleshere.smallModalUpperdiv}>
            <div>
              <p>From</p>
              <input type="date" />
            </div>
            <div>
              <p>Till</p>
              <input type="date" />
            </div>
          </div>
        </div>
        <br />
        <div className={styleshere.smallModalLocationDropDown}>
          <DropDown defaultDisplay={locationname[0]} options={locationname} />
        </div>
      </Modal>
    </>
  );
};

export default Reports;
