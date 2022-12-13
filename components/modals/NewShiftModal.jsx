import { useState } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { Checkbox, EditableInput } from "../inputComponents";
import Tabs from "../dashboardComponents/Tabs";
import Toggle from "../inputComponents/Toggle";

const NewShiftModal = (props) => {

    const [formType, setFormType] = useState('Single Shift');
    const [assignTo, setAssignTo] = useState('Users');
    const [releaseImmediately, setReleaseImmediately] = useState(false);
    const [startTime, setStartTime] = useState({});
    const [endTime, setEndTime] = useState({});
    const [toggle, setToggle] = useState('a');

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText='Create Shift'
            title='Create New Shift'
            type='twoColNarrow'
        >
            <Tabs
                className={DashboardModalStyles.singleColumn}
                options={['Single Shift', 'Batches']}
                selected={formType}
                setSelected={setFormType}
                size='big'
            />
            <EditableInput type='text' label='Start Date' required editOn />
            <EditableInput type='text' label='End Date' required editOn />
            <EditableInput type='time' label='Start Time' editOn />
            <EditableInput type='time' label='End Time' editOn />
            <Tabs
                className={DashboardModalStyles.singleColumn}
                options={['Users', 'Locations']}
                selected={assignTo}
                setSelected={setAssignTo}
                size='small'
                title='Assign Shift to'
            />
            <EditableInput type='text' label='User' className={DashboardModalStyles.singleColumn} required editOn />
            <EditableInput type='text' label='Shift name' className={DashboardModalStyles.singleColumn} editOn />
            <p className={DashboardModalStyles.instruction}>Shift Name cannot be more than 30 Characters</p>
            <Checkbox label='Release Shift Immediately'
                className={DashboardModalStyles.singleColumn}
                isChecked={releaseImmediately}
                setIsChecked={setReleaseImmediately}
            />
        </DashboardModal>
    );
};

export default NewShiftModal;
