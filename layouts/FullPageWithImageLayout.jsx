import { useState, useEffect } from 'react';
import { useRef } from 'react';
import WaawHead from '../components/WaawHead';
import styles from '../styles/layouts/FullPageWithImage.module.css';

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