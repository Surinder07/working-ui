import InputBox from '../../components/inputComponents/InputBox';
import styles from '../../styles/pages/LoginRegister.module.css';
import layoutStyles from '../../styles/layouts/LoginRegistration.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { userService } from '../../services/user.service';
import { validateEmail, validatePassword } from '../../helpers';
import PasswordPolicy from '../../components/PasswordPolicy';
import LoginRegistrationLayout from '../../layouts/LoginRegistrationLayout';
import Button from '../../components/Button';
import SuccessModal from '../../components/SuccessModal';

const Register = (props) => {

    useEffect(() => {
        props.setAuthenticationRequired(false);
        props.setShowTopNavigation(false);
    }, []);

    const Router = useRouter();
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
        setLoading(true);
        validateForms()
            .then((error) => {
                if (!error) {
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
            background='/bg/registration-bg.svg'
            logoLeft
        >
            <legend style={{ color: '#000' }}>start y<span style={{ color: '#90D9D3' }}>our </span><span style={{ color: '#2996C3' }}>journey</span></legend>
            <div className={styles.choiceContainer}>
                <div className={`${styles.choice} ${userRole === 'admin' && styles.selected}`}
                    onClick={() => setUserRole('admin')}
                >For Business</div>
                <div className={`${styles.choice} ${userRole === 'contractor' && styles.selected}`}
                    onClick={() => setUserRole('contractor')}
                >For Talent</div>
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
            <div className={layoutStyles.twoHalves}>
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
            <PasswordPolicy password={password} showError={passwordError} />
            <p style={{ position: 'relative', textAlign: 'left', margin: 0 }}>
                Already have an account?? <Link href='/login'>Log In</Link>
                {submitError && <p className={layoutStyles.errorText}>{submitErrorMessage}</p>}
            </p>

            <Button
                type='default'
                disabled={loading}
                onClick={handleRegister}
                style={{ margin: '20px 0' }}
            >
                Register
            </Button>
            <p style={{ width: '80%', textAlign: 'left', marginBottom: 0 }}>By clicking Register, you agree to our <Link href='/#'>Terms</Link> and acknowledge that you have read and accepted our <Link href='/#'>Privacy Poilcy</Link></p>
            {registrationSuccess &&
                <SuccessModal
                    title='Registration Successfull!'
                    message={`We have sent a verification email at ${email}. Please verify your email to continue.`}
                    onButtonClick={() => Router.push('/login')}
                />
            }
        </LoginRegistrationLayout>
    )
}

export default Register;