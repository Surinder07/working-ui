import { useEffect } from "react";
import { Button } from "../../components";
import { FullPageWithImageLayout } from "../../layouts";
import { FullPageLayout } from '../../styles/layouts';
const LinkExpired = (props) => {

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
            title='Link Expired'
            background='/bg/link-expired-bg.svg'
        >
            <h1 style={{ color: '#000' }}>Whoops! The link has expired.</h1>
            <h3>For security reasons, links expire after a little while. Please register again to continue</h3>
            <div className={FullPageLayout.fakeDivforMobileView}></div>
            <Button
                type='default'
                href='/register'
                style={{ marginTop: '20px' }}
            >
                Go to Registration
            </Button>
        </FullPageWithImageLayout>
    )

}

export default LinkExpired;