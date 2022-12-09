import React from "react";
import Modal from "./Modal";
import styles from "../../styles/elements/Modal.module.css";
import DropDown from "../inputComponents/DropDown";
import InputBox from "../inputComponents/InputBox";
import { useState } from "react";

const ModalTopButtons = {
  display: "flex",
  justifyContent: "spaceAround",
  border: "1px solid #535255",
  textAlign: "center",
  fontFamily: 'Poppins'
};

const style1 = {
  backgroundColor: "#2996C3",
  padding: "0.625em 2.188em",
  cursor: "pointer",
  width: "12.5em",
  color:"white"
};
const style2 = {
  backgroundColor: "white",
  padding: "0.625em 2.188em",
  cursor: "pointer",
  width: "12.5em",
  color:"black"
};

const CreateNewShift = (props) => {
  const [toggleShiftModal, setToggleShiftModal] = useState(true);
  const [toggleUsersLocation, setToggleUsersLocation] = useState(true);
  const handleShiftBatchesToggle = () => {
    setToggleShiftModal(!toggleShiftModal);
  };

  const handleShiftUserLocation = () => {
    setToggleUsersLocation(!toggleUsersLocation);
  };

  const locationname = ["Canada", "India", "United States"];
  const employeetype = ["admin", "user"];
  const buttonText = ["Submit", "Cancel"];
  const options = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  return (
    <div>
      <Modal
        size="dashboardModal"
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        buttonText={buttonText}
      >
        <h1
          style={{ color: "#2996C3", fontFamily: "Poppins", fontWeight: "500" }}
        >
          Create New Shift
        </h1>
        <div style={ModalTopButtons}>
          <span
            onClick={handleShiftBatchesToggle}
            style={toggleShiftModal ? style1 : style2}
          >
            Single Shift
          </span>
          <span
            onClick={handleShiftBatchesToggle}
            style={toggleShiftModal ? style2 : style1}
          >
            Batches
          </span>
        </div>
        {toggleShiftModal ? (
          <div>
            <div className={styles.shiftModalAppear}>
              <div>
                <p>Start Date</p>
                <input style={{ padding: "0.625em" }} type="date" />
              </div>
              <div>
                <p>End Date</p>
                <input style={{ padding: "0.625em" }} type="date" />
              </div>
            </div>
            <div className={styles.smallModalUpperdiv}>
              <div>
                <p>In Time</p>
                <span
                  style={{ display: "flex" }}
                  className={styles.modalDropDown}
                >
                  <DropDown defaultDisplay={options[0]} options={options} />
                  <DropDown defaultDisplay={options[0]} options={options} />
                </span>
              </div>
              <div>
                <p>Out Time</p>
                <span
                  style={{ display: "flex" }}
                  className={styles.modalDropDown}
                >
                  <DropDown defaultDisplay={options[0]} options={options} />
                  <DropDown defaultDisplay={options[4]} options={options} />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.shiftModalAppear}>
              <div>
                <p>Start Date</p>
                <input style={{ padding: "0.625em" }} type="date" />
              </div>
              <div>
                <p>End Date</p>
                <input style={{ padding: "0.625em" }} type="date" />
              </div>
            </div>
          </div>
        )}
        <div>
          <p>Assign Shifts to</p>
          <div style={ModalTopButtons}>
            <span
              onClick={handleShiftUserLocation}
              style={toggleUsersLocation ? style1 : style2}
            >
              Users
            </span>
            <span
              onClick={handleShiftUserLocation}
              style={toggleUsersLocation ? style2 : style1}
            >
              Location
            </span>
          </div>
        </div>
        {toggleUsersLocation ? (
          <div className={styles.shiftUserLocation}>
            <div>
              <p>Users</p>
              <InputBox type="text" />
            </div>
          </div>
        ) : (
          <div className={styles.shiftUserLocation}>
            <div>
              <p>Location</p>

              <DropDown
                defaultDisplay={locationname[0]}
                options={locationname}
              />
            </div>
            <div>
              <p>Roles</p>
              <InputBox type="text" />
            </div>
          </div>
        )}

        <div className={styles.shiftUserLocation}>
          <div style={{ marginTop: "-0.938em" }}>
            <p>Shift Name</p>
            <InputBox type="text" />
          </div>
          <span style={{ display: "flex" }}>
            <input type="checkbox" />
            <p style={{ fontSize: "12px" }}>Release Shift Immediately</p>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewShift;
