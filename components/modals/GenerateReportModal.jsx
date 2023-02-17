import { useEffect } from "react";
import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { dropdownService, reportsService } from "../../services";
import { combineBoolean, fetchAndHandle, fetchAndHandleGet, validateForEmptyField } from "../../helpers";
import { ReportType } from "../../constants";


const GenerateReportsModal = (props) => {
    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    //-----------------------------
    const [fromValue, setFromValue] = useState("");
    const [tillValue, setTillValue] = useState("")
    const [location, setLocation] = useState("")
    const [reportType, setReportType] = useState("ATTENDANCE")
    const [loading, setLoading] = useState(false);

    const [locationError, setLocationError] = useState({
        message: "",
        show: false
    })
    const [reportTypeError, setReportTypeError] = useState({
        message: "",
        show: false
    })
    const [startError, setStartError] = useState({
        message: "",
        show: false
    })
    const [endError, setEndError] = useState({
        message: "",
        show: false
    })

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
        setStartError({})
        setEndError({})
    }

    const isError = () => {
        return combineBoolean(
            validateForEmptyField(location, 'Location', setLocationError, props.role === 'ADMIN'),
            validateForEmptyField(fromValue, 'From date', setStartError, true),
            validateForEmptyField(tillValue, 'To date', setEndError, true),
            validateForEmptyField(reportType, 'Report type', setReportTypeError, true)
        )
    }

    const generateReport = () => {
        if (!isError()) {
            fetchAndHandle(() => reportsService.generate(fromValue, tillValue, reportType, location),
                null, setLoading, props.setReloadData, props.setPageLoading, onCancel, props.setShowModal,
                props.setToasterInfo)
            props.setShowModal(false);
        }
    }


    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Generate and Email"
            title="Generate Reports"
            type="twoColNarrow"
            onClick={generateReport}
            onCancel={onCancel}
            loading={loading}
        >
            <EditableInput
                type="date"
                value={fromValue}
                setValue={setFromValue}
                initialValue={fromValue}
                label="From"
                error={startError}
                setError={setStartError}
                required
                editOn
            />
            <EditableInput
                type="date"
                value={tillValue}
                setValue={setTillValue}
                initialValue={tillValue}
                error={endError}
                setError={setEndError}
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