import { useEffect } from "react";
import { FullPageWithImageLayout } from "../../layouts";
import { Button } from "../../components";
import { FullPageLayout } from '../../styles/layouts';
const EmailVerified = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'fullPage',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
    }, []);

    return (
        <FullPageWithImageLayout
            title='Email Verified'
            background='/bg/email-success-bg.svg'
        >
            <h3>Your email has been vaildated successfully. Please login to complete your profile.</h3>
            <div className={FullPageLayout.fakeDivforMobileView}></div>
            <Button
                type='default'
                href='/login'
                style={{ marginTop: '20px' }}
            >
                Go to Login
            </Button>
        </FullPageWithImageLayout>
    )

}

export default EmailVerified;