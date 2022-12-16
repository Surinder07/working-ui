import {UserPreferenceStyles} from "../../../styles/pages";
import {useState} from "react";
import UserPreferenceCard from "./UserPreferenceCard";
import {EditableInput} from "../../inputComponents";

const Organization = (props) => {
    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [organizationName, setOrganizationName] = useState("Organization");
    const [startWeek, setStartWeek] = useState("");
    const [payroll, setPayroll] = useState("");
    const [frequency, setFrequency] = useState("");
    const [timezone, setTimezone] = useState("");
    const [waawId, setWaawId] = useState("");
    const [overTimeRequest, setOverTimeRequest] = useState("");
    const [timeClock, setTimeClock] = useState("");
    const [timeSheet, setTimeSheet] = useState("");

    const [initialOrganizationName, setInitialOrganizationName] = useState("Organization");
    const [initialStartWeek, setInitialStartWeek] = useState("");
    const [initialPayroll, setInitialPayroll] = useState("");
    const [initialFrequency, setInitialFrequency] = useState("");
    const [initialTimezone, setInitialTimezone] = useState("");
    const [initialOverTimeRequest, setInitialOverTimeRequest] = useState("");
    const [initialTimeClock, setInitialTimeClock] = useState("");
    const [initialTimeSheet, setInitialTimeSheet] = useState("");
    return (
        <div className={UserPreferenceStyles.profileContainer}>
           
            <h1>Organization Preferences</h1>
          
            <UserPreferenceCard
                title="Organization Details"
                isEditable
                editOn={editPersonalDetails}
                setEditOn={setEditPersonalDetails}
            >
                <EditableInput
                    type="text"
                    label="Organization Name"
                    value={organizationName}
                    setValue={setOrganizationName}
                    initialValue={initialOrganizationName}
                    editOn={editPersonalDetails}
                />
                <EditableInput
                    type="dropdown"
                    options={[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ]}
                    label="Start of the Week"
                    value={startWeek}
                    setValue={setStartWeek}
                    initialValue={initialStartWeek}
                    editOn={editPersonalDetails}
                />
                <EditableInput
                    type="dropdown"
                    options={["data"]}
                    label="Payroll Generation"
                    value={payroll}
                    setValue={setPayroll}
                    initialValue={initialPayroll}
                    editOn={editPersonalDetails}
                />
                <EditableInput
                    type="dropdown"
                    options={["data"]}
                    label="Frequency"
                    value={frequency}
                    setValue={setFrequency}
                    initialValue={initialFrequency}
                    editOn={editPersonalDetails}
                />
                <EditableInput
                    type="text"
                    label="Timezone"
                    value={timezone}
                    setValue={setTimezone}
                    initialValue={initialTimezone}
                    editOn={editPersonalDetails}
                />
                <EditableInput
                    type="text"
                    label="Waaw ID"
                    value={waawId}
                    setValue={setWaawId}
                    // initialValue={initialFirstName}
                    nonEditable
                />
                <EditableInput
                    type="toggle"
                    label="Overtime Request"
                    value={overTimeRequest}
                    setValue={setOverTimeRequest}
                    initialValue={initialOverTimeRequest}
                    editOn={editPersonalDetails}
                />
                <EditableInput
                    type="toggle"
                    label="Timeclock"
                    value={timeClock}
                    setValue={setTimeClock}
                    initialValue={initialTimeClock}
                    editOn={editPersonalDetails}
                />
                <EditableInput
                    type="toggle"
                    label="Timesheet"
                    value={timeSheet}
                    setValue={setTimeSheet}
                    initialValue={initialTimeSheet}
                    editOn={editPersonalDetails}
                />
            </UserPreferenceCard>
        </div>
    );
};

export default Organization;
