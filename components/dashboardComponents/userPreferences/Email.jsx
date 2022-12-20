import { UserPreferenceStyles } from '../../../styles/pages';
import UserPreferenceCard from './UserPreferenceCard';
import { EditableInput, Button } from "../../inputComponents";
import { useState } from 'react';

const Email = (props) => {

    const [email, setEmail] = useState("")
    const [initialEmail, setInitialEmail] = useState("")

    return (
        <div className={UserPreferenceStyles.nonProfileContainer}>
            <div>
                <h1>Email Preferences</h1>
                <p>Your current email address is <span style={{ color: '#2996C3' }}>{props.data.email}</span></p>
                <UserPreferenceCard
                    title="Change Email"
                >
                    <EditableInput
                        type='text'
                        label='New Email Address'
                        value={email}
                        setValue={setEmail}
                        editOn
                    />
                    <div></div>
                    <Button type='dashboard' >Save Changes</Button>
                </UserPreferenceCard>
            </div>
        </div>
    )
}

export default Email;