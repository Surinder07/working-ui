import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputBox, PasswordPolicy, Button } from "../../components";
import { validatePassword } from "../../helpers";
import { FullPageWithImageLayout } from "../../layouts";
import { LinkExpiredBg, ResetPasswordFinishBg, ResetPasswordFinishSuccessBg } from "../../public/images";
import { userService } from "../../services";
import { FullPageLayout } from "../../styles/layouts";

const AcceptInvite = (props) => {

    const router = useRouter();

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'fullPage',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
    }, []);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inviteKey, setInviteKey] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [result, setResult] = useState({
        show: false,
        success: true
    });

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.key) {
            setInviteKey(router.query.key);
            userService.validateInviteKey(router.query.key)
                .then(res => {
                    if (res.error) {
                        setResult({
                            show: true,
                            success: false
                        })
                    }
                })
        }
        // else router.push('/login');
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
        validateForms()
            .then(error => {
                if (!error) {
                    setLoading(true);
                    props.setPageLoading(true);
                    userService.registerByInvitation(inviteKey, password)
                        .then(res => {
                            if (res.error) {
                                props.setToasterInfo({
                                    error: true,
                                    title: "Error!",
                                    message: res.message
                                })
                            } else {
                                setResult({
                                    show: true,
                                    success: true
                                })
                            }
                            setLoading(false);
                            props.setPageLoading(false);
                        })
                        .catch(() => {
                            setLoading(false);
                            props.setPageLoading(false);
                        })
                }
            })
    }

    return (
        <FullPageWithImageLayout
            title='Set A Password'
            background={ResetPasswordFinishBg.src}
            showSuccessModal={result.show}
            setShowSuccessModal={(val) => setResult({ ...result, show: val })}
            successModalBg={result.success ? ResetPasswordFinishSuccessBg.src : LinkExpiredBg.src}
            successButtonText='Go to Login'
            successTitle={result.success ? 'Password Set Successfully!' : 'Link Expired!'}
            successMessage={result.success ? 'Your WAAW account password has been set successfully.' :
                'Your invite link has expired. Please ask admin to resend invite.'}
            successRedirect='/login'
        >
            <h2>Set A Password</h2>
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
            <div className={FullPageLayout.fakeDivforMobileView}></div>
            <div className={FullPageLayout.errorAndButtonDiv}>
                <p>Go to <Link href="/login">Log in</Link></p>
                <Button
                    type='default'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Set Password
                </Button>
            </div>
        </FullPageWithImageLayout>
    )
}

export default AcceptInvite;