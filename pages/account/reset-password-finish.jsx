import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import InputBox from "../../components/inputComponents/InputBox";
import PasswordPolicy from "../../components/PasswordPolicy";
import FullPageWithImageLayout from "../../layouts/FullPageWithImageLayout";
import Button from "../../components/Button";
import { userService } from "../../services/user.service";

const ResetPasswordFinish = (props) => {

    const router = useRouter();

    useEffect(() => {
        props.setAuthenticationRequired(false);
        props.setShowTopNavigation(false);
    }, []);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetKey, setResetKey] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [submitError, setSubmitError] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.key)
            setResetKey(router.query.key);
        else router.push('/login');
    }, [router.isReady, router.query]);

    const checkConfirmPasswordError = () => {
        if (confirmPassword === '') {
            setConfirmPasswordMessage('Field is required');
            setConfirmPasswordError(true);
            return true;
        } else if (password !== confirmPassword) {
            setConfirmPasswordMessage('Password does not match');
            setConfirmPasswordError(true);
            return true;
        }
        return false;
    }

    const checkPasswordError = () => {
        let error = false;
        if (password === '') {
            setPasswordMessage('Field is required');
            setPasswordError(true);
            error = true;
        } else {
            error = !validatePassword(password);
            setPasswordMessage('Invalid Password');
            setPasswordError(error);
        }
        return error;
    }

    const validateForms = async () => {
        const err1 = checkPasswordError();
        const err2 = checkConfirmPasswordError();
        return err1 || err2;
    }

    const handleSubmit = () => {
        if (loading) return;
        setLoading(true);
        validateForms()
            .then(error => {
                if (!error) {
                    userService.finishResetPassword(resetKey, password)
                    .then(res => {
                        if (res.error) {
                            setSubmitErrorMessage(res.message);
                            setSubmitError(true);
                            setTimeout(() => setSubmitError(false), 3000);
                            setLoading(false);
                        } else {
                            setResetSuccess(true);
                        }
                    })
                }
            })
    }

    return (
        <FullPageWithImageLayout
            title='Reset Password'
            background='/bg/reset-password-finish-bg.svg'
        >
            <h2>Reset Password</h2>
            <InputBox
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                setValue={setPassword}
                errorMessage={passwordMessage}
                showError={passwordError}
                setShowError={setPasswordError}
                style={{ marginTop: 0 }}
            />
            <PasswordPolicy password={password} showError={passwordError} />
            <InputBox
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={confirmPassword}
                setValue={setConfirmPassword}
                errorMessage={confirmPasswordMessage}
                showError={confirmPasswordError}
                setShowError={setConfirmPasswordError}
                style={{ marginTop: 0 }}
            />
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {submitError && <p className={layoutStyles.errorText}>{submitErrorMessage}</p>}
                <p>Return to <Link href="/login">Log in</Link></p>
                <Button
                    type='default'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Reset Password
                </Button>
            </div>
        </FullPageWithImageLayout>
    )
}

export default ResetPasswordFinish;