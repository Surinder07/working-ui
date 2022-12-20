import { useState, useEffect, useRef } from 'react';
import { WaawHead, Modal } from '../components';
import { FullPageLayout } from '../styles/layouts';

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
            <WaawHead title={props.title} />
            <div className={FullPageLayout.page}>
                {
                    props.showSuccessModal &&
                    <Modal
                        size='medium'
                        showModal={props.showSuccessModal}
                        setShowModal={props.setShowSuccessModal}
                        buttonText={props.successButtonText}
                        link={props.successRedirect}
                    >
                        <div className={FullPageLayout.successBg} style={{ backgroundImage: `url(${props.successModalBg})` }}>
                        </div>
                        <h1>{props.successTitle}</h1>
                        <h3>{props.successMessage}</h3>
                    </Modal>
                }
                <div className={FullPageLayout.pageContainer} ref={containerRef}>
                    <div className={FullPageLayout.pageBackground}
                        style={{
                            height: `${backgroundHeight}`,
                            backgroundImage: `url(${props.background})`
                        }}></div>
                    <div className={FullPageLayout.contentContainer} ref={contentRef}>
                        <div className={FullPageLayout.contentSubContainer}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullPageWithImageLayout;
