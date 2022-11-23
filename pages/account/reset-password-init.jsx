import Link from "next/Link";
import { useState } from "react";
import { useEffect } from "react"
import InputBox from "../../components/inputComponents/InputBox";
import styles from '../../styles/pages/Account.module.css';

const ResetPasswordInit = (props) => {
    useEffect(() => {
        props.setActiveMenu('account');
    }, []);

    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.pageBackground} style={{ backgroundImage: `url(/bg/reset-password-init-bg.svg)` }}></div>
                    <h1>Trouble Logging in?</h1>
                    <h3>Enter your email and we will, send you a link to reset your password.</h3>
                    <InputBox
                        type='email'
                        name='email'
                        placeholder='abc@xyz.com'
                        className={styles.input}
                    // value={email}
                    // setValue={setEmail}
                    // errorMessage="Please enter valid email or username"
                    // showError={emailError}
                    // setShowError={setEmailError}
                    // onBlur={checkEmailError}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px' }}>
                        <p>Return to <Link href="/login">Log in</Link></p>
                        <button
                            className={`${styles.button} ${loading && styles.buttonDisabled}`}
                        // onClick={(e) => handleLogin(e)}
                        // disabled={loading}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordInit;