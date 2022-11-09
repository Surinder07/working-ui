import ComingSoonEl from '../../components/ComingSoonEl';
import HomeSection from '../../components/HomeSection';
import Card from '../../components/Card';
import { business, talent } from '../../lib/constants/HomeSectionInfo';
import SubscribeBar from '../../components/SubscribeBar';
import styles from '../../styles/pages/Home.module.css';

const Home = (props) => {

    return (
        <div className={`page`}>
            <div className={`${styles.introSection} pagePadding`}>
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
    )
}

export default Home;