import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userService } from "../../services";
import { Button, LinkExpired } from "../../components";
import { FullPageLayout } from '../../styles/layouts';
import { FullPageWithImageLayout } from "../../layouts";

const VerifyEmail = (props) => {

    const router = useRouter();

    const [success, setSuccess] = useState(true);
    const [finished, setFinished] = useState(false);
    const [verificationKey, setVerificationKey] = useState('');

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'fullPage',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
        props.setPageLoading(true);
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.key)
            setVerificationKey(router.query.key);
        else router.push('/login');
    }, [router.isReady, router.query]);

    useEffect(() => {
        if (verificationKey !== '') {
            userService.emailVerification(verificationKey)
            .then(res => {
                if (res.error) {
                    setSuccess(false);
                } 
                setFinished(true);
                props.setPageLoading(false);
            })
        }
    }, [verificationKey])

    return (
        finished ?
            <FullPageWithImageLayout
                title={success ? 'Email Verified' : 'Link Expired'}
                background={success ? '/images/bg/email-success-bg.svg' : '/images/bg/link-expired-bg.svg'}
            >
                {
                    success ?
                        <>
                            <h3>Your email has been vaildated successfully. Please login to complete your profile.</h3>
                            <div className={FullPageLayout.fakeDivforMobileView}></div>
                            <Button
                                type='default'
                                href='/login'
                                style={{ marginTop: '20px' }}
                            >
                                Go to Login
                            </Button>
                        </> :
                        <LinkExpired />
                }
            </FullPageWithImageLayout> :
            <></>
    )

}

export default VerifyEmail;