import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, InputBox } from "../../components";
import { FullPageWithImageLayout } from "../../layouts";
import { FullPageLayout } from '../../styles/layouts';
import { userService } from "../../services";
import { validateEmail } from "../../helpers";
import { ResetPasswordInitBg, ResetPasswordInitSuccessBg } from "../../public/images";

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
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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
                    props.setPageLoading(true);
                    userService.requestResetPassword(email)
                        .then(res => {
                            if (res.error) {
                                setSubmitErrorMessage(res.message);
                                setSubmitError(true);
                                setTimeout(() => setSubmitError(false), 3000);
                                setLoading(false);
                                props.setPageLoading(false);
                            } else {
                                setShowSuccessModal(true);
                                props.setPageLoading(false);
                            }
                        })
                }
            })
    }

    return (
        <FullPageWithImageLayout
            title='Reset Password'
            background={ResetPasswordInitBg.src}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
            successModalBg={ResetPasswordInitSuccessBg.src}
            successButtonText='OK'
            successTitle='Email Sent Successfully!'
            successMessage='The reset password link has been successfully sent to your email.'
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
            <div className={FullPageLayout.fakeDivforMobileView}></div>
            <div className={FullPageLayout.errorAndButtonDiv}>
                {submitError && <p className={FullPageLayout.errorText}>{submitErrorMessage}</p>}
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