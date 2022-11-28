import Link from "next/Link";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import InputBox from "../../components/inputComponents/InputBox";
import FullPageWithImageLayout from "../../layouts/FullPageWithImageLayout";
import styles from '../../styles/layouts/FullPageWithImage.module.css';
import { userService } from "../../services/user.service";
import { validateEmail } from "../../helpers";

const ResetPasswordInit = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'fullPage',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
    }, []);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [submitError, setSubmitError] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const checkEmailError = async () => {
        let error = false;
        if (email === '') {
            setEmailMessage('Field is required');
            setEmailError(true);
            error = true;
        } else {
            error = !validateEmail(email);
            setEmailMessage('Invalid Email');
            setEmailError(error);
        }
        return error;
    }

    const handleSubmit = () => {
        if (loading) return;
        setLoading(true);
        checkEmailError()
            .then(error => {
                if (!error) {
                    userService.requestResetPassword(email)
                        .then(res => {
                            if (res.error) {
                                setSubmitErrorMessage(res.message);
                                setSubmitError(true);
                                setTimeout(() => setSubmitError(false), 3000);
                                setLoading(false);
                            } else {
                                alert("Success");
                            }
                        })
                }
            })
    }

    return (
        <FullPageWithImageLayout
            title='Reset Password'
            background='/bg/reset-password-init-bg.svg'
            setActiveMenu={props.setActiveMenu}
        >
            <h1>Trouble Logging in?</h1>
            <h3>Enter your email and we will, send you a link to reset your password.</h3>
            <InputBox
                type='email'
                name='email'
                placeholder='abc@xyz.com'
                value={email}
                setValue={setEmail}
                errorMessage={emailMessage}
                showError={emailError}
                setShowError={setEmailError}
            />
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px' }}>
                {submitError && <p className={styles.errorText}>{submitErrorMessage}</p>}
                <p>Return to <Link href="/login">Log in</Link></p>
                <Button
                    type='default'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Continue
                </Button>
            </div>
        </FullPageWithImageLayout>
    )
}

export default ResetPasswordInit;