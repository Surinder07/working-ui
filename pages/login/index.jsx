import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Checkbox, InputBox, Button } from '../../components';
import { LoginRegisterStyles } from '../../styles/pages';
import { LoginRegisterLayout } from '../../styles/layouts';
import { userService } from '../../services';
import { ArrowRightAlt } from '@mui/icons-material';
import { validateUsernameEmail, validatePassword, secureLocalStorage } from '../../helpers';
import SocialIcons from '../../public/icons/socials/SocialIcons';
import { LoginRegistrationLayout } from '../../layouts';

const Login = (props) => {

    const router = useRouter();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'fullPage',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
        if (localStorage.getItem(userService.TOKEN_KEY)) {
            userService.getUser()
                .then(res => {
                    if (res.error) {
                        localStorage.removeItem(userService.TOKEN_KEY);
                        localStorage.removeItem(userService.USER_KEY);
                    } else {
                        props.setUser(JSON.parse(secureLocalStorage.getData(userService.USER_KEY)))
                        router.push('/dashboard');
                    }
                })
        }
    }, [])

    const checkEmailError = () => {
        let error = false;
        if (login === '') {
            setEmailMessage('Field is required');
            setEmailError(true);
            error = true;
        } else {
            error = !validateUsernameEmail(login);
            setEmailMessage('Invalid Email or username');
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
        return err1 || err2
    }

    const handleLogin = () => {
        if (loading) return;
        validateForms()
            .then(error => {
                if (!error) {
                    setLoading(true);
                    props.setPageLoading(true);
                    userService.login(login, password, rememberMe, props.setToken, props.setUser)
                        .then((res) => {
                            if (res.wait) return;
                            if (res.error) {
                                props.setPageLoading(false);
                                props.setToasterInfo({
                                    error: true,
                                    title: "Error!",
                                    message: res.message,
                                })
                            } else {
                                setLoading(false);
                                router.push('/dashboard');
                            }
                        });
                }
            })
    }

    return (
        <LoginRegistrationLayout
            pageTitle='Login'
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
                errorMessage={emailMessage}
                showError={emailError}
                setShowError={setEmailError}
            />
            <InputBox
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                setValue={setPassword}
                errorMessage={passwordMessage}
                showError={passwordError}
                setShowError={setPasswordError}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <Checkbox isChecked={rememberMe} setIsChecked={setRememberMe} label={'Remember Me'} />
                <Link href='account/reset-password-init'>Forgot Password</Link>
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
            <div className={LoginRegisterStyles.partition}>
                <span className={LoginRegisterStyles.line}></span>
                <p className={LoginRegisterStyles.partitionText}> OR </p>
                <span className={LoginRegisterStyles.line}></span>
            </div>
            <div style={{ position: 'relative', paddingBottom: '10px' }}>
                <div className={LoginRegisterLayout.inactiveCover}></div>
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