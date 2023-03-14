import { UserPreferenceStyles } from "../../../styles/pages";
import { useEffect, useState } from "react";
import UserPreferenceCard from "./UserPreferenceCard";
import { EditableInput } from "../../inputComponents";
import { PayrollFrequency } from "../../../constants";
import { organizationService } from "../../../services";
import { ImagePlaceholder } from "../../../public/images";
import { CameraAlt } from "@mui/icons-material";

const Organization = (props) => {

    const [uploadVisible, setUploadVisible] = useState(false);
    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [organizationName, setOrganizationName] = useState();
    const [startWeek, setStartWeek] = useState("");
    const [payrollFrequency, setPayrollFrequency] = useState("");
    const [timezone, setTimezone] = useState("");
    const [waawId, setWaawId] = useState("");
    const [allowUserToClockInTime, setAllowUserToClockInTime] = useState(0);
    const [overTimeRequest, setOverTimeRequest] = useState(true);
    const [timeOff, setTimeOff] = useState(true);
    const [timeSheet, setTimeSheet] = useState(true);

    const [data, setData] = useState({});

    useEffect(() => {
        if (props.data) {
            resetData();
        }
    }, [props.data])

    const resetData = () => {
        setData(props.data.organizationPreferences);
        setOrganizationName(props.data.organization);
        setStartWeek(props.data.startOfWeek);
        setPayrollFrequency(props.data.organizationPreferences.payrollGenerationFrequency);
        setTimezone(props.data.organizationTimezone);
        setWaawId(props.data.organizationWaawId);
        setOverTimeRequest(props.data.organizationPreferences.isOvertimeRequestEnabled);
        setTimeOff(props.data.organizationPreferences.isTimeoffEnabledDefault);
        setTimeSheet(props.data.organizationPreferences.isTimeClockEnabledDefault);
        setAllowUserToClockInTime(props.data.organizationPreferences.allowUserToClockInTime);
    }

    const handleUpload = (e) => {
        if (e.target.files.length) {
            organizationService.uploadLogo(e.target.files[0])
                .then(res => {
                    if (!res.error) {
                        props.setToaster({
                            error: false,
                            title: "Success",
                            message: 'Organization logo updated successfully.',
                        })
                    }
                })
        }
    };

    const saveData = () => {
        props.setLoading(true);
        organizationService.updatePreferences({
            isTimeclockEnabledDefault: timeSheet,
            isTimeoffEnabledDefault: timeOff,
            isOvertimeRequestEnabled: overTimeRequest,
            payrollGenerationFrequency: payrollFrequency,
            clockInAllowedMinutesBeforeShift: allowUserToClockInTime
        })
        .then((res) => {
            if (res.error) {
                props.setToaster({
                    error: true,
                    title: "Error",
                    message: res.message,
                })
            } else {
                props.setToaster({
                    error: false,
                    title: "Success",
                    message: 'Preferences updated successfully.',
                })
                props.setData({
                    ...props.data,
                    organizationPreferences: {
                        isTimeclockEnabledDefault: timeSheet,
                        isTimeoffEnabledDefault: timeOff,
                        isOvertimeRequestEnabled: overTimeRequest,
                        payrollGenerationFrequency: payrollFrequency,
                        clockInAllowedMinutesBeforeShift: allowUserToClockInTime
                    }
                })
            }
            props.setLoading(false);
        })
        .catch(() => props.setLoading(false))
    }

    return (
        <div className={UserPreferenceStyles.profileContainer}>
            <div className={UserPreferenceStyles.picContainer}>
                <div
                    className={UserPreferenceStyles.pic}
                    style={{ 
                        backgroundImage: `url(${props.data.organizationLogoUrl ? props.data.organizationLogoUrl : ImagePlaceholder.src})`,
                        backgroundSize: props.data.organizationLogoUrl ? 'contain' : 'cover'
                    }}
                    onMouseEnter={() => setUploadVisible(true)}
                    onMouseLeave={() => setUploadVisible(false)}
                >
                    {
                        uploadVisible &&
                        <label className={UserPreferenceStyles.uploadContainer} htmlFor='upload-button'>
                            <div className={UserPreferenceStyles.uploadBox}>
                                <CameraAlt />
                                <p>Choose File</p>
                            </div>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleUpload}
                            />
                        </label>
                    }
                </div>
            </div>
            <div>
                <h1>Organization Preferences</h1>
                <UserPreferenceCard
                    title="Organization Details"
                    isEditable
                    editOn={editPersonalDetails}
                    setEditOn={setEditPersonalDetails}
                    handleCancel={resetData}
                    onSave={saveData}
                >
                    <EditableInput
                        type="text"
                        label="Organization Name"
                        value={organizationName}
                        setValue={setOrganizationName}
                        initialValue={props.data.organization}
                        editOn={editPersonalDetails}
                        nonEditable
                    />
                    <EditableInput
                        type="text"
                        label="Timezone"
                        value={timezone}
                        setValue={setTimezone}
                        initialValue={props.data.organizationTimezone}
                        editOn={editPersonalDetails}
                        nonEditable
                    />
                    <EditableInput
                        type="text"
                        label="Start of the Week"
                        value={startWeek}
                        setValue={setStartWeek}
                        initialValue={props.data.startOfWeek}
                        editOn={editPersonalDetails}
                        nonEditable
                    />
                    <EditableInput
                        type="dropdown"
                        options={PayrollFrequency}
                        label="Payroll Generation Frequency"
                        placeholder='Select Payroll generation Frequency'
                        value={payrollFrequency}
                        setValue={setPayrollFrequency}
                        initialValue={props.data.organizationPreferences.payrollGenerationFrequency}
                        editOn={editPersonalDetails}
                    />
                    <EditableInput
                        type="text"
                        label="Waaw ID"
                        value={waawId}
                        setValue={setWaawId}
                        initialValue={props.data.organizationWaawId}
                        editOn={editPersonalDetails}
                        nonEditable
                    />
                    <EditableInput
                        type='number'
                        label='Allow user to clock in before shift (minutes)'
                        value={allowUserToClockInTime}
                        setValue={setAllowUserToClockInTime}
                        initialValue={props.data.organizationPreferences.clockInAllowedMinutesBeforeShift}
                        editOn={editPersonalDetails}
                    />
                    <div style={{  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }} className={UserPreferenceStyles.fullWidth}>
                        <EditableInput
                            type="toggle"
                            label="Overtime Request Enabled"
                            value={overTimeRequest}
                            setValue={setOverTimeRequest}
                            initialValue={data.isOvertimeRequestEnabled}
                            editOn={editPersonalDetails}
                        />
                        <EditableInput
                            type="toggle"
                            label="Time Off Request Enabled"
                            value={timeOff}
                            setValue={setTimeOff}
                            initialValue={data.isTimeoffEnabledDefault}
                            editOn={editPersonalDetails}
                        />
                        <EditableInput
                            type="toggle"
                            label="Timesheet Enabled"
                            value={timeSheet}
                            setValue={setTimeSheet}
                            initialValue={data.isTimeclockEnabledDefault}
                            editOn={editPersonalDetails}
                        />
                    </div>
                </UserPreferenceCard>
            </div>
        </div>
    );
};

export default Organization;
