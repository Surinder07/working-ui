import ComingSoonEl from '../components/ComingSoonEl';
import HomeSection from '../components/HomeSection';
import { business, talent } from '../lib/constants/HomeSectionInfo';
import SubscribeBar from '../components/SubscribeBar';
import styles from '../styles/Home.module.css';

export default function Home() {

    return (
        <div className={`${''} page`}>
            <div className={`${styles.introSection} pagePadding`}>
                <div className={styles.leftContainer}>
                    <div style={{ height: '30px' }}></div>
                    <h1 className={styles.intro}>The world's first platform to inspire people and business
                        to grow and thrive together</h1>
                    <div className={styles.introBottom}>
                        <ComingSoonEl />
                        <div className={styles.subscribeBox}>
                            <h3>Submit your email to join the wait list.</h3>
                            <SubscribeBar buttonColor={'#333'} buttonText={'#fff'} background={'#fff'} />
                        </div>
                        <div style={{ height: '50px' }}></div>
                    </div>
                </div>
            </div>
            <HomeSection 
                className={styles.businessSection}
                info={business}
            />
            <HomeSection 
                className={styles.talentSection}
                info={talent}
            />
        </div>
    )
}