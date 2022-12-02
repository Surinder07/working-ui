import { useState, useEffect } from 'react';
import { useRef } from 'react';
import WaawHead from '../components/WaawHead';
import styles from '../styles/layouts/FullPageWithImage.module.css';
import Modal from "../components/modals/Modal";

const FullPageWithImageLayout = (props) => {

    const contentRef = useRef();
    const containerRef = useRef();
    const [backgroundHeight, setBackgroundHeight] = useState('40vh');

    useEffect(() => {
        if (contentRef.current) {
            setBackgroundHeight(`${containerRef.current.clientHeight - contentRef.current.clientHeight}px`);
        }
    }, [contentRef])

    return (
        <>
            <WaawHead title={`WaaW | ${props.title}`} />
            <div className={styles.page}>
                {
                    props.showSuccessModal &&
                    <Modal
                        size='medium'
                        showModal={props.showSuccessModal}
                        setShowModal={props.setShowSuccessModal}
                        buttonText={props.successButtonText}
                        link={props.successRedirect}
                    >
                        <div className={styles.successBg} style={{ backgroundImage: `url(${props.successModalBg})` }}>
                        </div>
                        <h1>{props.successTitle}</h1>
                        <h3>{props.successMessage}</h3>
                    </Modal>
                }
                <div className={styles.pageContainer} ref={containerRef}>
                    <div className={styles.pageBackground}
                        style={{
                            height: `${backgroundHeight}`,
                            backgroundImage: `url(${props.background})`
                        }}></div>
                    <div className={styles.contentContainer} ref={contentRef}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullPageWithImageLayout;
