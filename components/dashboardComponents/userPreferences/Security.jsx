import { useState } from "react";
import { EditableInput } from "../..";
import { UserPreferenceStyles } from '../../../styles/pages';
import { Button } from '../../inputComponents'
import PasswordPolicy from '../../PasswordPolicy'
import UserPreferenceCard from './UserPreferenceCard';

const Security = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState({
        error: false,
        message: ''
    });
    const [ConfirmPasswordError, setConfirmPasswordError] = useState({
        error: false,
        message: ''
    });

    return (
        <div className={UserPreferenceStyles.nonProfileContainer}>
            <div>
                <h1>Security</h1>
                <UserPreferenceCard
                    title="Change your Password"
                >
                    <EditableInput
                        type="password"
                        label="Current Password"
                        value={currentPassword}
                        setValue={setCurrentPassword}
                        editOn
                    />
                    <div></div>
                    <div>
                        <EditableInput
                            style={{ marginBottom: '20px' }}
                            type="password"
                            label="New Password"
                            value={newPassword}
                            setValue={setNewPassword}
                            editOn
                        />
                        <PasswordPolicy password={newPassword} showError={newPasswordError.error} noMargin />
                    </div>
                    <div></div>
                    <EditableInput
                        type="password"
                        label="Confirm New Password"
                        value={confirmNewPassword}
                        setValue={setConfirmNewPassword}
                        editOn
                    />
                    <div></div>
                    <Button type='dashboard'>Submit</Button>
                </UserPreferenceCard>
            </div>
        </div>
    )
}

export default Security