import { UserPreferenceStyles } from '../../../styles/pages';
import UserPreferenceCard from './UserPreferenceCard';
import { EditableInput, Button } from "../../inputComponents";
import { useEffect, useState } from 'react';
import { SuccessEmailModal } from '../../modals';
import { userService } from '../../../services';
import { validateEmail } from '../../../helpers';

const Email = (props) => {

    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [emailError, setEmailError] = useState({});
    const [loading, setLoading] = useState(false);

    const checkEmailError = () => {
        let error = false;
        if (email === '') {
            setEmailError({
                show: true,
                message: 'Field is required'
            });
            error = true;
        } else {
            error = !validateEmail(email);
            error && setEmailError({
                show: true,
                message: 'Invalid email'
            });
        }
        return error;
    }

    const handleUpdate = () => {
        if(loading) return;
        if (!checkEmailError()) {
            setLoading(true);
            props.setLoading(true);
            userService.initEmailUpdate(email)
            .then(res => {
                if(res.error) {
                    props.setToaster({
                        error: true,
                        title: "Error",
                        message: res.message,
                    })
                } else {
                    setEmail('');
                    setShowModal(true);
                }
                setLoading(false);
                props.setLoading(false);
            })
        }
    }

    return (
        <div className={UserPreferenceStyles.nonProfileContainer}>
            <SuccessEmailModal
                showModal={showModal}
                setShowModal={setShowModal}
                title='Email Sent Successfully!'
                message='The verification link has been successfully sent to your email. Verify your new email to apply the changes.'
            />
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
                        error={emailError}
                        setError={setEmailError}
                        editOn
                    />
                    <div></div>
                    <Button disabled={loading} onClick={handleUpdate} type='dashboard' >Save Changes</Button>
                </UserPreferenceCard>
            </div>
        </div>
    )
}

export default Email;