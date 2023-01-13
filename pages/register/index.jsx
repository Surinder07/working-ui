import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LoginRegisterStyles } from '../../styles/pages';
import { LoginRegisterLayout } from '../../styles/layouts';
import { userService } from '../../services';
import { validateEmail, validatePassword } from '../../helpers';
import { LoginRegistrationLayout } from '../../layouts';
import { InputBox, PasswordPolicy, Button, SuccessModal, TermsAndPolicyModal } from '../../components';
import { RegistrationBg } from '../../public/images';

const Register = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'fullPage',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('admin');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');
    const [termsPrivacyModalType, setTermsPrivacyModalType] = useState('');
    const [showTermsPrivacyModal, setShowTermsPrivacyModal] = useState(false);
    const [showCS, setShowCS] = useState(false);

    const showModal = (type) => {
        setTermsPrivacyModalType(type);
        setShowTermsPrivacyModal(true);
    }

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

    const checkEmailError = () => {
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
        const err1 = checkEmailError();
        const err2 = checkPasswordError();
        const err3 = checkConfirmPasswordError();
        return err1 || err2 || err3;
    }

    const handleRegister = () => {
        if (loading) return;
        validateForms()
            .then((error) => {
                if (!error) {
                    setLoading(true);
                    userService.registerUser(email, password, userRole === 'contractor')
                        .then((res) => {
                            if (res.error) {
                                setSubmitErrorMessage(res.message);
                                setSubmitError(true);
                                setTimeout(() => setSubmitError(false), 3000);
                                setLoading(false);
                            } else {
                                setRegistrationSuccess(true);
                            }
                        });
                }
            });
    }

    return (
        <LoginRegistrationLayout
            pageTitle='Register'
            setActiveMenu={props.setActiveMenu}
            background={RegistrationBg.src}
            logoLeft
        >
            {
                showTermsPrivacyModal &&
                <TermsAndPolicyModal
                    data={termsPrivacyModalType}
                    showModal={showTermsPrivacyModal}
                    setShowModal={setShowTermsPrivacyModal}
                />
            }
            <legend style={{ color: '#000' }}>start y<span style={{ color: '#90D9D3' }}>our </span><span style={{ color: '#2996C3' }}>journey</span></legend>
            <div className={LoginRegisterStyles.choiceContainer}>
                <div className={`${LoginRegisterStyles.choice} ${userRole === 'admin' && LoginRegisterStyles.selected}`}
                    onClick={() => setUserRole('admin')}
                >For Business</div>
                <div className={`${LoginRegisterStyles.choice} ${userRole === 'contractor' && LoginRegisterStyles.selected}`}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setShowCS(true)}
                    onMouseLeave={() => setShowCS(false)}
                // onClick={() => setUserRole('contractor')}
                >For Talent
                    {showCS &&
                        <p style={{
                            position: 'absolute',
                            background: '#9B9B9B',
                            color: '#FFF',
                            margin: 0,
                            padding: '15px 25px',
                            top: '-53px',
                            zIndex: 500,
                            borderRadius: '10px'
                        }}>Coming Soon</p>
                    }</div>
            </div>
            <InputBox
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                setValue={setEmail}
                errorMessage={emailMessage}
                showError={emailError}
                setShowError={setEmailError}
                style={{ marginTop: 0 }}
            />
            <div className={LoginRegisterLayout.twoHalves}>
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
                <PasswordPolicy className={LoginRegisterStyles.showMobile} password={password} showError={passwordError} />
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
            </div>
            <PasswordPolicy className={LoginRegisterStyles.hideMobile} password={password} showError={passwordError} />
            <p style={{ position: 'relative', textAlign: 'left', margin: 0 }}>
                Already have an account?? <Link href='/login'>Log In</Link>
                {submitError && <p className={LoginRegisterLayout.errorText}>{submitErrorMessage}</p>}
            </p>

            <Button
                type='fullWidth'
                disabled={loading}
                onClick={handleRegister}
                style={{ margin: '20px 0' }}
            >
                Register
            </Button>
            <p style={{ textAlign: 'left', marginBottom: 0 }}>By clicking Register, you agree to our <Link onClick={() => showModal('terms')} href='#'>Terms</Link> and acknowledge that you have read and accepted our <Link onClick={() => showModal('privacy')} href='#'>Privacy Poilcy</Link></p>
            {registrationSuccess &&
                <SuccessModal
                    title='Registration Successfull!'
                    message={`We have sent a verification email at ${email}. Please verify your email to continue.`}
                    link={'/login'}
                    showModal={registrationSuccess}
                    setShowModal={setRegistrationSuccess}
                />
            }
        </LoginRegistrationLayout>
    )
}

export default Register;