import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";



const GenerateReportsModal = (props) => {
 
    const [fromValue,setFromValue] = useState("");
    const [tillValue,setTillValue]= useState("")
    const [location,setLocation] = useState("")

    const [initialFromValue,setInitialFromValue] = useState("")
    const [initialTillValue,setInitialTillValue] = useState("")
    const [initialLocation,setInitialLocation] = useState("")
 
    const [locationError,setLocationError] = useState({
        errorMessage:"",
        showError: false
    })

    const onCancel = () =>{
        setFromValue("")
        setTillValue("")
        setLocation("")
        setLocationError({
            errorMessage:"",
            showError: false
        })
    }
    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Generate Reports"
            type="twoColNarrow"
            onCancel={onCancel}
        >
            <EditableInput type="date"  value={fromValue} setValue={setFromValue} initialValue={initialFromValue} label="From"  editOn />
            <EditableInput type="date"  value={tillValue} setValue={setTillValue} initialValue={initialTillValue} label="Till"  editOn />
            <EditableInput
                type="dropdown"
                options={["India", "Canada", "Germany"]}
                label="Location"
                className={DashboardModalStyles.singleColumn}
                value={location}
                setValue={setLocation}
                initialValue={initialLocation}
                error={locationError}
                setError={setLocationError}
                editOn
            />
        </DashboardModal>
    );
};

export default GenerateReportsModal;