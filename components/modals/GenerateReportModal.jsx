import { useEffect } from "react";
import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { dropdownService } from "../../services";
import { fetchAndHandle, fetchAndHandleGet, validateForEmptyField } from "../../helpers";
import { ReportType } from "../../constants";


const GenerateReportsModal = (props) => {
    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    //-----------------------------
    const [fromValue, setFromValue] = useState("");
    const [tillValue, setTillValue] = useState("")
    const [location, setLocation] = useState("")
    const [reportType, setReportType] = useState("Attendance")


    const [locationError, setLocationError] = useState({
        message: "",
        show: false
    })
    const [reportTypeError, setReportTypeError] = useState({})

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.showModal && props.role === 'ADMIN')
            fetchAndHandleGet(() => dropdownService.getLocations(), setLocations);
    }, [props.showModal])

    const onCancel = () => {
        setFromValue("")
        setTillValue("")
        setLocation("")
        setReportTypeError({})
        setLocationError({})
    }

    const isError = () => {
        return validateForEmptyField(location, 'Location', setLocationError, props.role === 'ADMIN')
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(setLoading, props.setReloadData, props.setPageLoading, onCancel, props.setShowModal, props.setToasterInfo)
            // setLoading(true)
            //     props.setToasterInfo({
            //         error: true,
            //         title: 'Error!',
            //         message: res.message
            //     })
            // }
            // else {
            //     props.setToasterInfo({
            //         error: false,
            //         title: 'Success!',
            //         message: 'Report Generated successfully'
            //     });
            //     props.setReloadData(true)
            //     onCancel()
            // setLoading(false)
        }
    }


    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Generate and Email"
            title="Generate Reports"
            type="twoColNarrow"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <EditableInput
                type="date"
                value={fromValue}
                setValue={setFromValue}
                initialValue={fromValue}
                label="From"
                required
                editOn
            />
            <EditableInput
                type="date"
                value={tillValue}
                setValue={setTillValue}
                initialValue={tillValue}
                label="Till"
                required
                editOn
            />
            {
                props.role === 'ADMIN' &&
                <>
                    <EditableInput
                        type="dropdown"
                        options={locations}
                        label="Location"
                        placeholder="Location"
                        className={DashboardModalStyles.singleColumn}
                        value={location}
                        setValue={setLocation}
                        initialValue={location}
                        error={locationError}
                        setError={setLocationError}
                        required
                        editOn
                    />
                    <EditableInput
                        type="dropdown"
                        options={ReportType}
                        label="Report Type"
                        placeholder="Report Type"
                        className={DashboardModalStyles.singleColumn}
                        value={reportType}
                        setValue={setReportType}
                        initialValue={reportType}
                        error={reportTypeError}
                        setError={setReportTypeError}
                        required
                        editOn
                    />
                </>
            }

        </DashboardModal>
    );
};

export default GenerateReportsModal;