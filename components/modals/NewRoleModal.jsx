import React from "react";
import { DashboardModal } from "./base";
// import { DashboardModalStyles } from "../../styles/elements";
import { EditableInput } from "../inputComponents";


const NewRoleModal = (props) => {
    const options = ["India", "Canada", "USA", "Germany"]
    return (
        <div>
            <DashboardModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText='Submit'
                title='Create New Role'
                type='twoColWide'
            >
                <EditableInput type='text' label='Role Name' editOn />
                <EditableInput type='dropdown' options={options} placeholder="Location" label='Location' editOn />
                <EditableInput type='text' label='Total hours per day (Maximum)' editOn />
                <EditableInput type='text' label='Total hours per day (Minimum)' editOn />
                <EditableInput type='text' label='Maximum consequtive work days' editOn />
                <EditableInput type='text' label='Minimum gaps between shifts' editOn />
            </DashboardModal>

        </div>
    );
};

export default NewRoleModal;
