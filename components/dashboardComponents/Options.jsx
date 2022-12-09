import { useRef, useState, useEffect } from 'react';
import styles from '../../styles/elements/Options.module.css';

const Options = (props) => {

    const [showOptions, setShowOptions] = useState(false);
    const ref = useRef();

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setShowOptions(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div ref={ref} className={props.vertical ? styles.optionsV : styles.optionsH} onClick={() => setShowOptions(!showOptions)}>
            <span></span>
            <span></span>
            <span></span>
            <div className={styles.openOptions}
                style={{
                    height: showOptions ? `${props.options.length * 50}px` : 0,
                    boxShadow: showOptions ? '0 0 2px 1px #53525520' : 'none'
                }}>
                {
                    props.options.map((opt, i) => (
                        <p key={i} onClick={() => opt.action(props.actionId)}>{opt.key}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default Options;