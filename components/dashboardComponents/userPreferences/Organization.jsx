import { UserPreferenceStyles } from "../../../styles/pages";
import { useEffect, useState } from "react";
import UserPreferenceCard from "./UserPreferenceCard";
import { EditableInput } from "../../inputComponents";
import { PayrollFrequency } from "../../../constants";

const Organization = (props) => {

    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [organizationName, setOrganizationName] = useState();
    const [startWeek, setStartWeek] = useState("");
    const [payrollFrequency, setPayrollFrequency] = useState("");
    const [timezone, setTimezone] = useState("");
    const [waawId, setWaawId] = useState("");
    const [overTimeRequest, setOverTimeRequest] = useState("");
    const [timeClock, setTimeClock] = useState("");
    const [timeSheet, setTimeSheet] = useState("");

    const [data, setData] = useState({});

    useEffect(() => {
        if (props.data) {
            resetData();
        }
    }, [props.data])

    const resetData = () => {
        setData(props.data.organizationPreferences);
        setOrganizationName(props.data.organization);
        setStartWeek(data.weekStart);
        setPayrollFrequency(data.payrollGenerationFrequency);
        setTimezone(props.data.organizationTimezone);
        setWaawId(props.data.organizationWaawId);
        setOverTimeRequest(props.data.isOvertimeRequestEnabled);
        setTimeClock(props.data.isTimeoffEnabledDefault);
        setTimeSheet(props.data.isTimeClockEnabledDefault);
    }

    return (
        <div className={UserPreferenceStyles.nonProfileContainer}>
            <div>
                <h1>Organization Preferences</h1>
                <UserPreferenceCard
                    title="Organization Details"
                    isEditable
                    editOn={editPersonalDetails}
                    setEditOn={setEditPersonalDetails}
                    handleCancel={resetData}
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
                        initialValue={data.weekStart}
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
                        initialValue={data.payrollGenerationFrequency}
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
                    <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
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
                            value={timeClock}
                            setValue={setTimeClock}
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
