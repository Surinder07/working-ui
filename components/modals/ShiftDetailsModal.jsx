import {useEffect, useState} from "react";
import {MobileModalStyles} from "../../styles/elements";
import {ArrowBack, Edit, Delete} from "@mui/icons-material";
import {WaawNoIndexHead, EditableInput} from "../../components";
import {DashboardStyles} from "../../styles/pages";

const ShiftDetailsModal = (props) => {
    const [editOn, setEditOn] = useState(true);
    const [startTime, setStartTime] = useState("");
    const [initialStartTime, setInitialStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [initialEndTime, setInitialEndTime] = useState("");

    return (
        <>
            <WaawNoIndexHead title="Shifts" />
            <div className={MobileModalStyles.container}>
                <ArrowBack className={MobileModalStyles.arrowBackIcon} />
                <div className={MobileModalStyles.header}>Shifts</div>
                <div className={MobileModalStyles.actions}>
                    <Edit className={MobileModalStyles.editIcon} />
                    <Delete className={MobileModalStyles.deleteIcon} />
                </div>
                <div className={DashboardStyles.shiftDetails}>
                    <div>
                        <h4>Shift Id</h4>
                        <p>259999</p>
                    </div>
                    <div>
                        <h4>Shift Name</h4>
                        <p>Name of Shift</p>
                    </div>
                    <div>
                        <h4>Creation Date</h4>
                        <p>Name of Shift</p>
                    </div>
                </div>
                <div className={MobileModalStyles.contentContainer}>
                    <EditableInput type="text" editOn={editOn} label="Employee ID" className={DashboardStyles.colspan2} />
                    <EditableInput type="text" editOn={editOn} label="Employee Name" className={DashboardStyles.colspan2} />
                    <EditableInput type="text" editOn={editOn} label="Email Address" className={DashboardStyles.colspan2} />
                    <EditableInput type="text" editOn={editOn} label="Role" className={DashboardStyles.colspan2} />
                    <EditableInput
                        type="time"
                        label="Shift Start Time"
                        value={startTime}
                        className={DashboardStyles.colspan1}
                        setValue={setStartTime}
                        initialValue={initialStartTime}
                        editOn={editOn}
                    />
                    <EditableInput type="time" label="Shift End Time" value={endTime} className={DashboardStyles.colspan1} setValue={setEndTime} initialValue={initialEndTime} editOn={editOn} />
                    <EditableInput type="text" editOn={editOn} label="Status" className={DashboardStyles.colspan2} />
                    <EditableInput type="text" editOn={editOn} label="Comments" className={DashboardStyles.colspan2} />
                </div>
            </div>
        </>
    );
};

export default ShiftDetailsModal;
