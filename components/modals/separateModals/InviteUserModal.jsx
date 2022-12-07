import React, { useState } from "react";
import Modal from "../Modal";
import styles from "../../../styles/elements/SeparateModal.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DropDown from "../../inputComponents/DropDown";
import Switch from '@mui/material/Switch';
const InviteUserModal = (props) => {

    const locationname = ["Canada", "India", "United States"];
    const employeetype = ["admin", "user"];
    const buttonText = ["Submit", "Cancel"]
  return (
    <div className={styles.InviteUserModalMain}>
      <Modal
        size="medium"
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        buttonText={buttonText}
      >
        <h1 style={{ color: "#2996C3",fontFamily: 'Poppins',fontWeight:"500" }}>Invite User</h1>
        <div className={styles.inviteUserTopModal}>
          <div>
            <CloudUploadIcon fontSize="large" color="action"/>
            <br/>
           <label htmlFor="upload">Select file to Import</label>
           <input type="file" id="upload" style={{display:"none"}}/>
           <h4 id={styles.paraInInput}>Must be .xlsx or .csv file using our email template</h4>
          </div>
        </div>
        <br/>
          -0R-
            <br/>
           
          <form className={styles.inviteUserModalForm}>
            <div>
            <label htmlFor="firstname">First Name <span style={{color:"red"}}>*</span></label>
            <input type="text" />
            </div>
            <div>
            <label htmlFor="lastname">Last Name <span style={{color:"red"}}>*</span></label>
            <input type="text" />
            </div>
            <div>
            <label htmlFor="lastname">Type Of Employee <span style={{color:"red"}}>*</span></label>
            <DropDown defaultDisplay={employeetype[0]} options={employeetype} />
            </div>
            <div>
            <label htmlFor="lastname">External Employee ID <span style={{color:"red"}}>*</span></label>
            <input type="text" />
            </div>
            <div>
            <label htmlFor="lastname">Email Address <span style={{color:"red"}}>*</span></label>
            <input type="text" />
            </div>
            <div>
            <label htmlFor="lastname">Location <span style={{color:"red"}}>*</span></label>
            <DropDown defaultDisplay={locationname[0]} options={locationname} />
            </div>
           
            <span>
                <label htmlFor="">Permanent</label>
          <Switch/>
             <label htmlFor="">Part Time</label>
            </span>
          </form>
      </Modal>
    </div>
  );
};

export default InviteUserModal;
