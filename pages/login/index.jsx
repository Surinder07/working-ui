import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WaawHead from '../../components/WaawHead';
import Card from '../../components/Card';
import Checkbox from '../../components/Checkbox';
import InputBox from '../../components/InputBox';
import LinkedImage from '../../components/LinkedImage';
import Images from '../../public/Images';
import styles from '../../styles/pages/Login.module.css';
import { userService } from '../../services/user.service';

const Login = (props) => {
    const router = useRouter();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        props.setActiveMenu('login');
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

    const handleLogin = (e) => {
        e.preventDefault;
        setLoading(false);
        userService.login(login, password, rememberMe)
            .then(() => router.push('/dashboard'))
            .catch(error => {
                setLoading(false)
                alert('error', error)
            });
    }

    return (
        <>
            <WaawHead title={'WaaW | Login'} />
            <div className={styles.loginPage}>
                <Card className={styles.loginModal}>
                    <div className={styles.logoContainer}>
                        <LinkedImage src={Images.Logo} link='/' height={60} alt='Logo' />
                    </div>
                    <div className={styles.form}>
                        <legend>Login to continue</legend>
                        <InputBox
                            type='user'
                            name='userEmail'
                            placeholder='Username or Email'
                            value={login}
                            setValue={setLogin} />
                        <InputBox
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            setValue={setPassword} />
                        <Checkbox isChecked={rememberMe} setIsChecked={setRememberMe} label={'Remember Me'} />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <button
                                className={styles.loginButton}
                                onClick={(e) => handleLogin(e)}
                                disabled={loading}
                            >Login</button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Login;