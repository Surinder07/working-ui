import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";



const GenerateReportsModal = (props) => {
 
    const [fromValue,setFromValue] = useState("");
    const [tillValue,setTillValue]= useState("")
    const [location,setLocation] = useState("")
 
    const [locationError,setLocationError] = useState({
        errorMessage:"",
        showError: false
    })
    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Generate Reports"
            type="twoColNarrow"
        >
            <EditableInput type="date"  value={fromValue} setValue={setFromValue} label="From"  editOn />
            <EditableInput type="date"  value={tillValue} setValue={setTillValue} label="Till"  editOn />
            <EditableInput
                type="dropdown"
                options={["India", "Canada", "Germany"]}
                label="Location"
                className={DashboardModalStyles.singleColumn}
                value={location}
                setValue={setLocation}
                error={locationError}
                setError={setLocationError}
                editOn
            />
        </DashboardModal>
    );
};

export default GenerateReportsModal;