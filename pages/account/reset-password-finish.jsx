import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import InputBox from "../../components/inputComponents/InputBox";
import styles from '../../styles/pages/Account.module.css';
import PasswordPolicy from "../../components/PasswordPolicy";

const ResetPasswordFinish = (props) => {
    useEffect(() => {
        props.setActiveMenu('account');
    }, []);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.pageBackground} style={{ backgroundImage: `url(/bg/reset-password-finish-bg.svg)` }}></div>
                    <div className={styles.contentContainer}>
                        <h2>Reset Password</h2>
                        <InputBox
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            setValue={setPassword}
                            // onChange={onConfirmChange}
                            // errorMessage="Please enter valid password"
                            // showError={passwordError}
                            // setShowError={setPasswordError}
                            // onBlur={checkPasswordError}
                            style={{ marginTop: 0 }}
                        />
                        <PasswordPolicy password={password} />
                        <InputBox
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            // value={confirmPassword}
                            // setValue={setConfirmPassword}
                            // onChange={onConfirmChange}
                            // errorMessage="Password does not match"
                            // showError={confirmPasswordError}
                            // setShowError={setConfirmPasswordError}
                            style={{ marginTop: 0 }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px' }}>
                            <p>Return to <Link href="/login">Log in</Link></p>
                            <button
                                className={`${styles.button} ${loading && styles.buttonDisabled}`}
                            // onClick={(e) => handleLogin(e)}
                            // disabled={loading}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ResetPasswordFinish;