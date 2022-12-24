import {useEffect, useState} from "react";
import {DashboardStyles} from "../../styles/pages";
import {WaawNoIndexHead, EditableInput, MobileModal} from "../../components";

const EmployeeModal = (props) => {
    const [editOn, setEditOn] = useState(true);

    return (
        <>
            <WaawNoIndexHead title="Employee" />
            <MobileModal header="Employee" edit delete setEditOn={setEditOn}>
                <EditableInput type="text" editOn={editOn} label="Employee ID" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Employee Name" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Email Address" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Contact Detail" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Role" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Location" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Status" className={DashboardStyles.colspan2} />
            </MobileModal>
        </>
    );
};

export default EmployeeModal;
