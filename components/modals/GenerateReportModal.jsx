import React, { useEffect } from "react";
import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { dropdownService } from "../../services";


const GenerateReportsModal = (props) => {
    const [locations, setLocations] = useState([])
    const [fromValue, setFromValue] = useState("");
    const [tillValue, setTillValue] = useState("")
    const [location, setLocation] = useState("")
    const [payload,setPayload] = useState("")
    const [attendance,setAttendance] = useState("")
    const [locationHoliday,setLocationHoliday] = useState("")

    const [initialFromValue, setInitialFromValue] = useState("")
    const [initialTillValue, setInitialTillValue] = useState("")
    const [initialLocation, setInitialLocation] = useState("")

    const [locationError, setLocationError] = useState({
        message: "",
        show: false
    })
    const [payloadError,setPayloadError] = useState({})
    const [attendanceError, setAttendanceError] = useState({})
    const [locationHolidayError, setLocationHolidayError] = useState({})
    const [loading, setLoading] = useState({});
    const onCancel = () => {
        setFromValue("")
        setTillValue("")
        setLocation("")
        setPayload("")
        setAttendance("")
        setLocationHoliday("")
        setPayloadError({})
        setAttendanceError({})
        setLocationHolidayError({})
        setLocationError({
            message: "",
            show: false
        })
    }

    useEffect(() => {
        if (props.role === 'ADMIN') {
            dropdownService.getLocations()
                .then(res => {
                    if (!res.error) {
                        setLocations(res);
                    }
                })
        }
    }, [])

    const validateForm = async () => {
        let error = false;

        return error
    }

    const saveData = () => {
        validateForm()
            .then(error => {
                if (!error) {

                    setLoading(true)
                    if (error == true) {
                        props.setToasterInfo({
                            error: true,
                            title: 'Error!',
                            message: res.message
                        })
                    }
                    else {
                        props.setToasterInfo({
                            error: false,
                            title: 'Success!',
                            message: 'Report Generated successfully'
                        });
                        props.setReloadData(true)
                        onCancel()
                    }
                    setLoading(false)
                }
            })
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Generate Reports"
            type="twoColNarrow"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <EditableInput type="date" value={fromValue} setValue={setFromValue} initialValue={initialFromValue} label="From" editOn />
            <EditableInput type="date" value={tillValue} setValue={setTillValue} initialValue={initialTillValue} label="Till" editOn />
            <EditableInput 
            type="dropdown"
            options={["India", "Canada", "Germany"]}
            label="Payload"
            placeholder="Payload"
            className={DashboardModalStyles.singleColumn}
            value={payload}
            setValue={setPayload}
            initialValue={payload}
            error={payloadError}
            setError={setPayloadError}
            editOn
            />
              <EditableInput 
            type="dropdown"
            options={["India", "Canada", "Germany"]}
            label="Attendance"
            placeholder="Attendance"
            className={DashboardModalStyles.singleColumn}
            value={attendance}
            setValue={setAttendance}
            initialValue={attendance}
            error={attendanceError}
            setError={setAttendanceError}
            editOn
            />
             <EditableInput 
            type="dropdown"
            options={["India", "Canada", "Germany"]}
            label="Holiday"
            placeholder="Holiday"
            className={DashboardModalStyles.singleColumn}
            value={locationHoliday}
            setValue={setLocationHoliday}
            initialValue={locationHoliday}
            error={locationHolidayError}
            setError={setLocationHolidayError}
            editOn
            />
            {props.role === 'ADMIN' &&
                <EditableInput
                    type="dropdown"
                    options={["India", "Canada", "Germany"]}
                    label="Location"
                    placeholder="Location"
                    className={DashboardModalStyles.singleColumn}
                    value={location}
                    setValue={setLocation}
                    initialValue={location}
                    error={locationError}
                    setError={setLocationError}
                    editOn
                />
            }
        </DashboardModal>
    );
};

export default GenerateReportsModal;