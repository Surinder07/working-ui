import { FullPageLayout } from '../styles/layouts';
import { Button } from "./inputComponents";

const LinkExpired = (props) => {
    return (
        <>
            <h1 style={{ color: '#000' }}>Whoops! The link has expired.</h1>
            <h3>For security reasons, links expire after a little while. {props.link ? 'Please try again' :
            'Please register again to continue'}</h3>
            <div className={FullPageLayout.fakeDivforMobileView}></div>
            <Button
                type='default'
                href={props.link ? props.link : '/register'}
                style={{ marginTop: '20px' }}
            >
                {props.buttonText ? props.buttonText : 'Go to Registration'}
            </Button>
        </>
    )
}

export default LinkExpired;