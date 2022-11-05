import SubscribeBar from './SubscribeBar';
import styles from '../styles/elements/Footer.module.css';
import Link from 'next/link';
import { SocialLinks } from '../lib/constants/SocialLinks';

const Footer = (props) => {

    const contactEmail = 'waaw.management@waaw.ca';

    return (
        <footer className={styles.footer}>
            <div className={`${styles.footerTop} pagePadding`}>
                <div className={styles.footerComponent} >
                    <h1>Company</h1>
                    <Link className={styles.link} href='/why-waaw' onClick={() => props.setsetActiveMenu('Why WaAAW')}>About Us</Link>
                </div>
                <div className={`${styles.footerComponent} ${styles.appContainer}`} >
                    <div className={styles.appCover}></div>
                    <h1>Mobile App</h1>
                    <div className={styles.mobileIcons}>
                        <img src='/icons/apple.svg' alt='Download IOS App' />
                        <img src='/icons/google.svg' alt='Download Android App' />
                    </div>
                </div>
                <div className={styles.footerComponent} >
                    <h1>Contact Us</h1>
                    <Link className={styles.link} href={`mailto:${contactEmail}`}>{contactEmail}</Link>
                </div>
                <div className={styles.footerComponent} >
                    <h1>Subscribe us to know more</h1>
                    <SubscribeBar />
                    <h3>Join our team and continue your hassle free journey</h3>
                </div>
            </div>
            <div className={`${styles.footerBottom} pageMargin`}>
                <div className={styles.leftContainer}>
                    <div className={styles.footerComponent} >
                        <h1>Connect Us</h1>
                        <div className={styles.socialIcons}>
                            {
                                SocialLinks.map((social, i) => (
                                    <Link key={i} styles={{ margin: '0' }} id={i} href={social.link} target='_blank'>
                                        <img src={social.image} alt={social.social} />
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.iconTextContainer}>
                        <img src='/icons/GlobeIcon.svg' />
                        <p>English</p>
                    </div>
                    <div className={styles.iconTextContainer}>
                        <img src='/icons/LocationIcon.svg' />
                        <p>Toronto</p>
                    </div>
                </div>
                <div className={styles.footerComponent} style={{marginTop: '30px'}}>
                    <Link href="/" onClick={() => props.setActiveMenu('/')}>
                        <img src='/logo/Logo.svg' alt="HOME" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;