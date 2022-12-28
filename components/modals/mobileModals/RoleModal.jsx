import {useEffect, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, EditableInput, MobileModal} from "../..";

const RoleModal = (props) => {
    const [creationDate, setCreationDate] = useState("");
    const [inititialCreationDate, setInitialCreationDate] = useState("");
    const [editOn, setEditOn] = useState(true);

    return (
        <>
            <WaawNoIndexHead title="Roles" />
            <MobileModal header="Roles" edit delete setEditOn={setEditOn}>
                <EditableInput type="text" editOn={editOn} label="Role ID" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Name" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Profile Type" className={DashboardStyles.colspan2} />
                <EditableInput
                    type="date"
                    label="Creation date"
                    value={creationDate}
                    className={DashboardStyles.colspan2}
                    setValue={setCreationDate}
                    initialValue={initialCreationDate}
                    editOn={editOn}
                />
                <EditableInput type="text" editOn={editOn} label="Location" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Status" className={DashboardStyles.colspan2} />
            </MobileModal>
        </>
    );
};

export default RoleModal;
