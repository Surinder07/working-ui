import SubscribeBar from './SubscribeBar';
import { FooterStyles } from '../../styles/elements';
import { PageStyles } from '../../styles/pages';
import Link from 'next/link';
import { logo, footerIcons } from '../../constants';
import LinkedImage from '../LinkedImage';
import { useState } from 'react';
import { TermsAndPolicyModal } from '../modals';
import { joinClasses } from '../../helpers';

const Footer = () => {

    const contactEmail = process.env.termsAndPrivacyData.customerSupport;
    const [termsPrivacyModalType, setTermsPrivacyModalType] = useState('');
    const [showTermsPrivacyModal, setShowTermsPrivacyModal] = useState(false);

    const showModal = (type) => {
        setTermsPrivacyModalType(type);
        setShowTermsPrivacyModal(true);
    }

    return (
        <footer className={FooterStyles.footer}>
            {/* Top Part of the footer  */}
            {
                showTermsPrivacyModal &&
                <TermsAndPolicyModal
                    data={termsPrivacyModalType}
                    showModal={showTermsPrivacyModal}
                    setShowModal={setShowTermsPrivacyModal} />
            }
            <div className={joinClasses(FooterStyles.footerTop, PageStyles.pagePadding)}>
                <div className={FooterStyles.footerComponent} >
                    <h1>Company</h1>
                    <Link className={FooterStyles.link} href='/why-waaw'>About Us</Link>
                    <p className={FooterStyles.link} onClick={() => showModal('nda')}>Confidentiality and Non Disclosure</p>
                    <p className={FooterStyles.link} onClick={() => showModal('cookies')}>Cookies and Policy</p>
                    <p className={FooterStyles.link} onClick={() => showModal('disclaimer')}>Disclaimer</p>
                </div>
                <div className={joinClasses(FooterStyles.footerComponent, FooterStyles.appContainer)}>
                    <div className={FooterStyles.appCover}></div>
                    <h1>Mobile App</h1>
                    <div className={FooterStyles.mobileIcons}>
                        <LinkedImage
                            className={FooterStyles.mobileIcon}
                            link={footerIcons.mobileApps.apple.link}
                            src={footerIcons.mobileApps.apple.src}
                            alt={footerIcons.mobileApps.apple.alt}
                            style={{ marginRight: '5px' }}
                        />
                        <LinkedImage
                            className={FooterStyles.mobileIcon}
                            link={footerIcons.mobileApps.google.link}
                            src={footerIcons.mobileApps.google.src}
                            alt={footerIcons.mobileApps.google.alt}
                            style={{ marginLeft: '5px' }}
                        />
                    </div>
                </div>
                <div className={FooterStyles.footerComponent} >
                    <h1>Contact Us</h1>
                    <Link className={FooterStyles.link} href={`mailto:${contactEmail}`}>{contactEmail}</Link>
                </div>
                <div className={FooterStyles.footerComponent} >
                    <h1>Subscribe us to know more</h1>
                    <SubscribeBar style={{ marginBottom: '20px' }} />
                    <h3>Join our team and continue your hassle free journey</h3>
                </div>
            </div>
            {/* Bottom Part of the footer  */}
            <div className={joinClasses(FooterStyles.footerBottom, PageStyles.pageMargin)}>
                <div className={joinClasses(FooterStyles.footerComponent, FooterStyles.socialContainer)} >
                    <div className={FooterStyles.appCover}></div>
                    <h1>Connect Us</h1>
                    <div className={FooterStyles.socialIcons}>
                        {
                            footerIcons.socialIcons.map((social, i) => (
                                <LinkedImage
                                    key={i}
                                    className={FooterStyles.socialIcon}
                                    link={social.link}
                                    src={social.src}
                                    alt={social.alt}
                                    heightOrient
                                    newTab
                                />
                            ))
                        }
                    </div>
                </div>
                <div className={FooterStyles.footerComponent} >
                    <div className={FooterStyles.iconContainer}>
                        <div className={FooterStyles.iconTextContainer}>
                            <LinkedImage
                                className={FooterStyles.footerIcon}
                                src={footerIcons.language.src}
                                alt={footerIcons.language.alt}
                                heightOrient
                            />
                            <p className={FooterStyles.noMargin}>English</p>
                        </div>
                        <div className={FooterStyles.iconTextContainer}>
                            <LinkedImage
                                className={FooterStyles.footerIcon}
                                src={footerIcons.location.src}
                                alt={footerIcons.location.alt}
                                heightOrient
                            />
                            <p className={FooterStyles.noMargin}>Toronto</p>
                        </div>
                    </div>
                </div>
                <div className={FooterStyles.footerComponent} style={{ margin: '0' }}></div>
                <div className={joinClasses(FooterStyles.footerComponent, FooterStyles.footerLogo)} >
                    <LinkedImage
                        className={FooterStyles.logo}
                        link={logo.default.link}
                        src={logo.default.src}
                        alt={logo.default.alt}
                        heightOrient
                    />
                    <p>Version: {process.env.version}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;