import {useEffect, useState} from "react";
import {DashboardStyles} from "../../styles/pages";
import {WaawNoIndexHead, EditableInput, MobileModal} from "../../components";

const RequestModal = (props) => {
    const [creationDate, setCreationDate] = useState("");
    const [initialCreationDate, setInitialCreationDate] = useState("");

    const [editOn, setEditOn] = useState(true);

    return (
        <>
            <WaawNoIndexHead title="Requests" />
            <MobileModal header="Requests" edit delete setEditOn={setEditOn}>
                <EditableInput type="text" editOn={editOn} label="Location ID" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Location Name" className={DashboardStyles.colspan2} />
                <EditableInput
                    type="date"
                    label="Creation date"
                    value={creationDate}
                    className={DashboardStyles.colspan2}
                    setValue={setCreationDate}
                    initialValue={initialCreationDate}
                    editOn={editOn}
                />
                <EditableInput type="text" editOn={editOn} label="Time zone" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Number of active employees" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Number of inactive employees" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Status" className={DashboardStyles.colspan2} />
            </MobileModal>
        </>
    );
};

export default RequestModal;
