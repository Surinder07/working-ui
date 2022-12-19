import { UserPreferenceStyles } from '../../../styles/pages';
import UserPreferenceCard from './UserPreferenceCard';
import {EditableInput} from "../../inputComponents";
import { useState } from 'react';
const Email = (props) => {
    const [editPersonalDetails, setEditPersonalDetails] = useState(false)
    const [email,setEmail] = useState("")
    const [initialEmail,setInitialEmail] = useState("")
    return (
        <div className={UserPreferenceStyles.profileContainer}>
            <h1>Email Preferences</h1>
            <p>Your current email address is <span>{props.email}</span></p>
            <UserPreferenceCard
                title="Change Email"
                isEditable
                editOn={editPersonalDetails}
                setEditOn={setEditPersonalDetails}
            >
                    <EditableInput type='text' label='email' value={email} setValue={setEmail} editOn={editPersonalDetails}  />

            </UserPreferenceCard>
        </div>
    )
}

export default Email;