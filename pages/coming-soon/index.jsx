import WaawHead from '../../components/WaawHead';
import LinkedImage from "../../components/LinkedImage";
import styles from '../../styles/pages/ComingSoon.module.css';
import Images from "../../public/Images";
import { useEffect } from 'react';

const ComingSoon = (props) => {

    useEffect(() => {
        props.setActiveMenu('coming-soon');
    }, [])

    return (
        <>
        <WaawHead title={'WaaW | Coming Soon'} />
            <div className={styles.background}>
                <div className={styles.logoContainer}>
                    <LinkedImage
                        link='/'
                        src={Images.LogoInverted}
                        alt='Logo(link to home)'
                        height={80}
                        onClick={() => {
                            props.setActiveMenu('/');
                            props.setOpenMenu(false);
                        }}
                    />
                </div>
                <h3>WE ARE PREPARING SOMETHING AWESOME</h3>
                <h1>COMING SOON</h1>
                <div className={styles.loader}>
                    <div className={styles.loader_progress}></div>
                </div>
                <p className={styles.loader_percent}>50%</p>
            </div>
        </>
    )
}

export default ComingSoon;