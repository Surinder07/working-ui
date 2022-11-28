import ComingSoonEl from '../components/ComingSoonEl';
import HomeSection from '../components/homeComponents/HomeSection';
import Card from '../components/Card';
import { business, talent } from '../constants/HomeSectionInfo';
import SubscribeBar from '../components/homeComponents/SubscribeBar';
import styles from '../styles/pages/Home.module.css';
import pageStyles from '../styles/Pages.module.css';
import WaawHead from '../components/WaawHead';
import { useEffect } from 'react';

const Home = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'loggedOut',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
    }, [])

    return (
        <>
            <WaawHead />
            <div className={pageStyles.page}>
                <div className={`${styles.introSection} ${pageStyles.pagePadding}`}>
                    <div className={styles.introContent}>
                        <h1 className={styles.introText}>The <span className={styles.colorBlue}>world's first</span> platform to inspire people and business
                            to <span className={styles.colorBlue}>grow</span> and <span className={styles.colorBlue}>thrive together</span></h1>
                        <div className={styles.introBottom}>
                            <ComingSoonEl />
                            <Card className={styles.subscribeBox}>
                                <h3>Submit your email to join the wait list.</h3>
                                <SubscribeBar buttonColor={'#333'} buttonText={'#fff'} background={'#fff'} />
                            </Card>
                        </div>
                    </div>
                    <div className={styles.introFiller}></div>
                </div>
                <HomeSection info={business} screenType={props.screenType} />
                <HomeSection info={talent} screenType={props.screenType} />
            </div>
        </>
    )
}

export default Home;