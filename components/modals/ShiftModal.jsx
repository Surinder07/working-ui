import {useEffect, useState} from "react";
import {DashboardStyles} from "../../styles/pages";
import {WaawNoIndexHead, EditableInput, MobileModal} from "../../components";

const ShiftsModal = (props) => {
    const [startDate, setStartDate] = useState("");
    const [initialStartDate, setInitialStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [initialEndDate, setInitialEndDate] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [initialCreationDate, setInitialCreationDate] = useState("");

    const [editOn, setEditOn] = useState(true);

    return (
        <>
            <WaawNoIndexHead title="Shifts" />
            <MobileModal header="Shifts" edit delete setEditOn={setEditOn}>
                <EditableInput type="text" editOn={editOn} label="Shift ID" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Shift Name" className={DashboardStyles.colspan2} />
                <EditableInput type="date" label="Start Date" value={startDate} className={DashboardStyles.colspan1} setValue={setStartDate} initialValue={initialStartDate} editOn={editOn} />
                <EditableInput type="date" label="End Date" value={endDate} className={DashboardStyles.colspan1} setValue={setEndDate} initialValue={initialEndDate} editOn={editOn} />
                <EditableInput
                    type="date"
                    label="Creation Date"
                    value={creationDate}
                    className={DashboardStyles.colspan1}
                    setValue={setCreationDate}
                    initialValue={initialCreationDate}
                    editOn={editOn}
                />
                <EditableInput type="text" editOn={editOn} label="Status" className={DashboardStyles.colspan1} />
                <EditableInput type="text" editOn={editOn} label="Location" className={DashboardStyles.colspan2} />
            </MobileModal>
        </>
    );
};

export default ShiftsModal;
