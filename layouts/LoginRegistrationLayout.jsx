import { useEffect } from "react";
import WaawHead from "../components/WaawHead";
import styles from '../styles/layouts/LoginRegistration.module.css';
import LinkedImage from '../components/LinkedImage';
import Images from '../public/Images';

const LoginRegistrationLayout = (props) => {

    useEffect(() => {
        props.setActiveMenu('hide');
    }, []);

    return (
        <>
            <WaawHead title={`WaaW | ${props.pageTitle}`} />
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridLeftContainer}>
                            {
                                props.logoLeft &&
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <LinkedImage src={Images.Logo} link='/' height={60} alt='Logo' />
                                </div>
                            }
                            {props.children}
                        </div>
                        <div className={styles.gridRightContainer} style={{ backgroundImage: `url(${props.background})` }}>
                            {
                                props.logoRight &&
                                <LinkedImage className={styles.rightLogo} src={Images.Logo} height={70} link='/' alt='logo' />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginRegistrationLayout;