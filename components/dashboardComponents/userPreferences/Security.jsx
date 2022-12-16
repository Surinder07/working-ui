import {useState} from "react";
import { UserPreferenceStyles } from '../../../styles/pages';
import UserPreferenceCard from './UserPreferenceCard';

const Security = () => {
    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [currentPasswords, setCurrentPasswords] = useState("");
    const [newPasswords, setNewPasswords] = useState("");
    const [confirmNewPasswords, setConfirmNewPasswords] = useState("");
    const [initialCurrentPasswords, setInitialCurrentPasswords] = useState("");
    const [initialNewPasswords, setInitialNewPasswords] = useState("");
    const [initialConfirmNewPasswords, setInitialConfirmNewPasswords] = useState("");

  return (
    <div className={UserPreferenceStyles.profileContainer}>
        <h1>Security</h1>
        <UserPreferenceCard
                title="Change your Password"
                isEditable
                editOn={editPersonalDetails}
                setEditOn={setEditPersonalDetails}
            >
                 <EditableInput
                    type="text"
                    label="Current Password"
                    value={organizationName}
                    setValue={setOrganizationName}
                    initialValue={initialOrganizationName}
                    editOn={editPersonalDetails}
                />
                </UserPreferenceCard>  
    </div>
  )
}

export default Security