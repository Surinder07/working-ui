import { WaawHead, LinkedImage } from "../../components";
import { ComingSoonStyles } from '../../styles/pages';
import { LogoInverted } from "../../public/images";
import { useEffect } from 'react';

const ComingSoon = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "fullPage",
            activeMenu: "none",
            activeSubMenu: "none",
        });
    }, [])

    return (
        <>
            <WaawHead title='Coming Soon' />
            <div className={ComingSoonStyles.background}>
                <div className={ComingSoonStyles.logoContainer}>
                    <LinkedImage
                        link='/'
                        src={LogoInverted}
                        alt='Logo(link to home)'
                        height={80}
                        onClick={() => {
                            props.setActiveMenu('/');
                            props.setOpenMenu(false);
                        }}
                    />
                </div>
                <h3>WE ARE PREPARING SOMETHING AWESOME</h3>
                <h1>COMING SOON</h1>
                <div className={ComingSoonStyles.loader}>
                    <div className={ComingSoonStyles.loader_progress}></div>
                </div>
                <p className={ComingSoonStyles.loader_percent}>50%</p>
            </div>
        </>
    )
}

export default ComingSoon;