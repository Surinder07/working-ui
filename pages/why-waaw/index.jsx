import { useEffect } from 'react';
import { WhyWaawStyles, PageStyles } from '../../styles/pages';
import { WhyWaawContent } from '../../constants';
import { WaawHead } from '../../components';

const WhyWaaw = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'loggedOut',
            activeMenu: 'WHY_WAAW',
            activeSubMenu: 'none'
        })
    }, [])

    return (
        <>
            <WaawHead title={'WaaW | About us'} description={process.env.header.aboutUsDescription} meta={{ openGraph: { url: 'https://waaw.ca/why-waaw' } }} />
            <div className={`${PageStyles.page} ${PageStyles.flexPageColumn}`}>
                <div className={`${PageStyles.pageMargin} ${PageStyles.smallContentContainer}`}>
                    <h1>Why WAAW?</h1>
                    {
                        WhyWaawContent.whyWaaw.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))
                    }
                </div>
                <img src='/bg/why-waaw-bg.svg' className={WhyWaawStyles.middleBackground} />
                <div className={WhyWaawStyles.greyContainer}>
                    <div className={`${PageStyles.pageMargin} ${PageStyles.smallContentContainer}`}>
                        <h1>About Us</h1>
                        {
                            WhyWaawContent.aboutUs.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyWaaw;