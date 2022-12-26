import {useEffect, useState} from "react";
import {DashboardStyles} from "../../styles/pages";
import {WaawNoIndexHead, EditableInput, MobileModal} from "../../components";

const RequestModal = (props) => {
    const [initiationDate, setInitiationDate] = useState("");
    const [initialInitiationDate, setInitialInitiationDate] = useState("");

    const [editOn, setEditOn] = useState(true);

    return (
        <>
            <WaawNoIndexHead title="Requests" />
            <MobileModal header="Requests" edit delete setEditOn={setEditOn}>
                <EditableInput type="text" editOn={editOn} label="Shift ID" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Request type" className={DashboardStyles.colspan2} />
                <EditableInput
                    type="date"
                    label="Initiation date"
                    value={initiationDate}
                    className={DashboardStyles.colspan2}
                    setValue={setInitiationDate}
                    initialValue={initialInitiationDate}
                    editOn={editOn}
                />
                <EditableInput type="text" editOn={editOn} label="Initiated By" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Assigned to" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Location" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Status" className={DashboardStyles.colspan2} />
            </MobileModal>
        </>
    );
};

export default RequestModal;
