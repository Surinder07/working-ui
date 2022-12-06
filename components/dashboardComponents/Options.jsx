import { useState } from 'react';
import styles from '../../styles/elements/Options.module.css';

const Options = (props) => {

    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className={props.vertical ? styles.optionsV : styles.optionsH} onClick={() => setShowOptions(!showOptions)}>
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
                        <p key={i} onClick={opt.action}>{opt.key}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default Options;