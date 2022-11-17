import { useEffect } from 'react';
import styles from '../../styles/pages/WhyWaaw.module.css';
import pageStyles from '../../styles/Pages.module.css';
import { WhyWaawContent } from '../../constants/WhyWaawContent';
import WaawHead from '../../components/WaawHead';

const WhyWaaw = (props) => {

    useEffect(() => {
        props.setActiveMenu('Why WAAW')
    }, [])

    return (
        <>
            <WaawHead title={'WaaW | About us'} description={process.env.header.aboutUsDescription} meta={{ openGraph: { url: 'https://waaw.ca/why-waaw' } }} />
            <div className={`${pageStyles.page} ${pageStyles.flexPageColumn}`}>
                <div className={`${pageStyles.pageMargin} ${pageStyles.smallContentContainer}`}>
                    <h1>Why WAAW?</h1>
                    {
                        WhyWaawContent.whyWaaw.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))
                    }
                </div>
                <img src='/bg/why-waaw-bg.svg' className={styles.middleBackground} />
                <div className={styles.greyContainer}>
                    <div className={`${pageStyles.pageMargin} ${pageStyles.smallContentContainer}`}>
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