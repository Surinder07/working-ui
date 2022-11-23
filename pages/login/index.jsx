import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Checkbox from '../../components/inputComponents/Checkbox';
import InputBox from '../../components/inputComponents/InputBox';
import styles from '../../styles/pages/LoginRegister.module.css';
import layoutStyles from '../../styles/layouts/LoginRegistration.module.css';
import { userService } from '../../services/user.service';
import { ArrowRightAlt } from '@mui/icons-material';
import { validateUsernameEmail, validatePassword } from '../../helpers';
import SocialIcons from '../../public/icons/socials/SocialIcons';
import Button from '../../components/Button';
import LoginRegistrationLayout from '../../layouts/LoginRegistrationLayout';

const Login = (props) => {
    const router = useRouter();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem(userService.TOKEN_KEY)) {
            userService.getUser()
                .then(res => {
                    if (res && res.email) {
                        router.push('/dashboard')
                    }
                })
                .catch(() => {
                    localStorage.removeItem(userService.TOKEN_KEY);
                    localStorage.removeItem(userService.USER_KEY);
                })
        }
    }, [])

    const checkEmailError = () => {
        if (login !== '')
            setEmailError(!validateUsernameEmail(login));
        else setEmailError(false);
    }

    const checkPasswordError = () => {
        if (password !== '')
            setPasswordError(!validatePassword(password));
        else setPasswordError(false);
    }

    const handleLogin = (e) => {
        e.preventDefault;
        checkEmailError();
        checkPasswordError();
        if (emailError || passwordError) return;
        if (loading) return;
        setLoading(true);
        userService.login(login, password, rememberMe, props.setToken, props.setUser)
            .then((res) => {
                if (res.error) {
                    setSubmitErrorMessage(res.message);
                    setSubmitError(true);
                    setTimeout(() => setSubmitError(false), 1000)
                    setLoading(false)
                } else {
                    router.push('/dashboard')
                }
            });
    }

    return (
        <LoginRegistrationLayout
            pageTitle='Login'
            setActiveMenu={props.setActiveMenu}
            background='/bg/login-bg.svg'
            logoLeft
        >
            <legend>Welcome Back!</legend>
            <InputBox
                type='email'
                name='userEmail'
                placeholder='Username or Email'
                value={login}
                setValue={setLogin}
                errorMessage="Please enter valid email or username"
                showError={emailError}
                setShowError={setEmailError}
                onBlur={checkEmailError}
            />
            <InputBox
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                setValue={setPassword}
                errorMessage="Please enter valid password"
                showError={passwordError}
                setShowError={setPasswordError}
                onBlur={checkPasswordError}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <Checkbox isChecked={rememberMe} setIsChecked={setRememberMe} label={'Remember Me'} />
                <Link href='account/reset-password-init'>Forgot Password</Link>
                {true && <p className={layoutStyles.errorText}>{submitErrorMessage}</p>}
            </div>
            <Button
                type='fullWidth'
                disabled={loading}
                onClick={handleLogin}
                icon={{
                    element: <ArrowRightAlt />
                }}
                style={{ marginTop: '20px' }}
            >
                Login
            </Button>
            <div className={styles.partition}>
                <span className={styles.line}></span>
                <p className={styles.partitionText}> OR </p>
                <span className={styles.line}></span>
            </div>
            <div style={{ position: 'relative', paddingBottom: '10px' }}>
                <div className={layoutStyles.inactiveCover}></div>
                <Button
                    type='social'
                    disabled={loading}
                    // onClick={handleLogin}
                    icon={{
                        src: SocialIcons.GoogleButtonIcon,
                        height: 30,
                        alt: 'Google'
                    }}
                    style={{ marginTop: '20px' }}
                >
                    Log in with Google
                </Button>
                <Button
                    type='social'
                    disabled={loading}
                    // onClick={handleLogin}
                    icon={{
                        src: SocialIcons.LinkedInButtonIcon,
                        height: 30,
                        alt: 'LinkedIn'
                    }}
                    style={{ marginTop: '20px' }}
                >
                    Log in with LinkedIn
                </Button>
            </div>
            <p style={{ marginTop: '10px' }}>Don't have an account yet? <Link href='/register'>Sign Up</Link></p>
        </LoginRegistrationLayout>
    )
}

export default Login;