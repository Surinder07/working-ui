import React, { useState } from "react";
import Modal from "./Modal";
import {ModalStyles} from "../../styles/elements";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DropDown from "../inputComponents/DropDown";
import Switch from "@mui/material/Switch";
import InputBox from "../inputComponents/InputBox";
const InviteUserModal = (props) => {
  const locationname = ["Canada", "India", "United States"];
  const employeetype = ["admin", "user"];
  const buttonText = ["Submit", "Cancel"];
  return (
    <div className={styles.InviteUserModalMain}>
      <Modal
        size="dashboardModal"
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        buttonText={buttonText}
      >
        <h1
          style={{ color: "#2996C3", fontFamily: "Poppins", fontWeight: "500" }}
        >
          Invite User
        </h1>
        <div className={styles.inviteUserTopModal}>
          <div>
            <CloudUploadIcon fontSize="large" color="action" />
            <br />
            <label htmlFor="upload">Select file to Import</label>
            <input type="file" id="upload" style={{ display: "none" }} />
            <h4 id={styles.paraInInput}>
              Must be .xlsx or .csv file using our email template
            </h4>
          </div>
        </div>
        <p>-OR-</p>

        <div className={styles.inviteUserModalForm}>
          <div>
            <label htmlFor="firstname">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <InputBox type="text" />
          </div>
          <div>
            <label htmlFor="lastname">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <InputBox type="text" />
          </div>
          <div>
            <label htmlFor="lastname">External Employee ID</label>
            <InputBox type="text" />
          </div>
          <div>
            <label htmlFor="lastname">Email Address</label>
            <InputBox type="text" />
          </div>
          <div>
            <label htmlFor="lastname">
              Type Of Employee <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <br />
            <DropDown defaultDisplay={employeetype[0]} options={employeetype} />
          </div>
          <div>
            <label htmlFor="lastname">
              Location <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <br />
            <DropDown defaultDisplay={locationname[0]} options={locationname} />
          </div>

          <span style={{ marginTop: "10px" }}>
            <label htmlFor="">Permanent</label>
            <Switch />
            <label htmlFor="">Part Time</label>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default InviteUserModal;
