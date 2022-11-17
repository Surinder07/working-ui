import SubscribeBar from './SubscribeBar';
import styles from '../styles/elements/Footer.module.css';
import pageStyles from '../styles/Pages.module.css';
import Link from 'next/link';
import { ImagesInfo } from '../constants/ImagesInfo';
import LinkedImage from './LinkedImage';

const Footer = (props) => {

    const contactEmail = 'waaw.management@waaw.ca';

    return (
        <footer className={styles.footer}>
            {/* Top Part of the footer  */}
            <div className={`${styles.footerTop} ${pageStyles.pagePadding}`}>
                <div className={styles.footerComponent} >
                    <h1>Company</h1>
                    <Link className={styles.link} href='/why-waaw' onClick={() => props.setsetActiveMenu('Why WaAAW')}>About Us</Link>
                </div>
                <div className={`${styles.footerComponent} ${styles.appContainer}`}>
                    <div className={styles.appCover}></div>
                    <h1>Mobile App</h1>
                    <div className={styles.mobileIcons}>
                        <LinkedImage
                            // link={ImagesInfo.footerIcons.mobileApps.apple.link}
                            src={ImagesInfo.footerIcons.mobileApps.apple.src}
                            alt={ImagesInfo.footerIcons.mobileApps.apple.alt}
                            height={ImagesInfo.footerIcons.mobileApps.height[props.screenType]}
                            style={{ marginRight: '5px' }}
                        />
                        <LinkedImage
                            // link={ImagesInfo.footerIcons.mobileApps.google.link}
                            src={ImagesInfo.footerIcons.mobileApps.google.src}
                            alt={ImagesInfo.footerIcons.mobileApps.google.alt}
                            height={ImagesInfo.footerIcons.mobileApps.height[props.screenType]}
                            style={{ marginLeft: '5px' }}
                        />
                    </div>
                </div>
                <div className={styles.footerComponent} >
                    <h1>Contact Us</h1>
                    <Link className={styles.link} href={`mailto:${contactEmail}`}>{contactEmail}</Link>
                </div>
                <div className={styles.footerComponent} >
                    <h1>Subscribe us to know more</h1>
                    <SubscribeBar style={{ marginBottom: '20px' }} />
                    <h3>Join our team and continue your hassle free journey</h3>
                </div>
            </div>
            {/* Bottom Part of the footer  */}
            <div className={`${styles.footerBottom}  ${pageStyles.pageMargin}`}>
                <div className={`${styles.footerComponent} ${styles.socialContainer}`} >
                    <div className={styles.appCover}></div>
                    <h1>Connect Us</h1>
                    <div className={styles.socialIcons}>
                        {
                            ImagesInfo.footerIcons.socialIcons.map((social, i) => (
                                <LinkedImage
                                    key={i}
                                    link={social.link}
                                    src={social.src}
                                    alt={social.alt}
                                    height={ImagesInfo.footerIcons.height[props.screenType]}
                                    style={{ marginRight: '20px' }}
                                    newTab
                                />
                            ))
                        }
                    </div>
                </div>
                <div className={`${styles.footerComponent} `} >
                    <div className={styles.iconContainer}>
                        <div className={styles.iconTextContainer}>
                            <LinkedImage
                                src={ImagesInfo.footerIcons.language.src}
                                alt={ImagesInfo.footerIcons.language.alt}
                                height={ImagesInfo.footerIcons.height[props.screenType]}
                                style={{ marginRight: props.screenType == 2 ? '5px' : '20px' }}
                            />
                            <p>English</p>
                        </div>
                        <div className={styles.iconTextContainer}>
                            <LinkedImage
                                src={ImagesInfo.footerIcons.location.src}
                                alt={ImagesInfo.footerIcons.location.alt}
                                height={ImagesInfo.footerIcons.height[props.screenType]}
                                style={{ marginRight: props.screenType == 2 ? '5px' : '20px' }}
                            />
                            <p>Toronto</p>
                        </div>
                    </div>
                </div>
                <div className={styles.footerComponent} style={{ margin: '0' }}></div>
                <div className={`${styles.footerComponent} ${styles.footerLogo}`}>
                    <LinkedImage
                        link={ImagesInfo.logo.link}
                        src={ImagesInfo.logo.src}
                        alt={ImagesInfo.logo.alt}
                        height={ImagesInfo.logo.footerHeight[props.screenType]}
                        onClick={() => props.setActiveMenu('/')}
                    />
                </div>
            </div>
        </footer>
    )
}

export default Footer;