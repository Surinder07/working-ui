import styles from '../../styles/pages/WhyWaaw.module.css';
import { WhyWaawContent } from '../../lib/constants/WhyWaawContent';
import WaawHead from '../../components/WaawHead';

const WhyWaaw = () => {
    return (
        <>
        <WaawHead title={'WaaW | About us'} description={process.env.header.aboutUsDescription} meta={{openGraph:{url:'https://waaw.ca/why-waaw'}}}/>
        <div className={`page ${styles.aboutUsPage}`}>
            <div className={`pageMargin ${styles.contentContainer}`}>
                <h1>Why WAAW?</h1>
                {
                    WhyWaawContent.whyWaaw.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))
                }
            </div>
            <img src='/bg/why-waaw-bg.svg' className={styles.middleBackground} />
            <div className={styles.greyContainer}>
                <div className={`pageMargin ${styles.contentContainer}`}>
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