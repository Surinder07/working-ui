import { useRef, useState, useEffect } from 'react';
import { joinClasses } from '../../helpers';
import { OptionsStyles } from '../../styles/elements';

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
        <div ref={ref} className={props.vertical ? OptionsStyles.optionsV : OptionsStyles.optionsH} onClick={() => setShowOptions(!showOptions)}>
            <span></span>
            <span></span>
            <span></span>
            <div className={OptionsStyles.openOptions}
                style={{
                    height: showOptions ? `${props.options.length * 50}px` : 0,
                    boxShadow: showOptions ? '0 0 2px 1px #53525520' : 'none'
                }}>
                {
                    props.options.map((opt, i) => {
                        return <p
                            key={i}
                            className={opt.condition(props.status, props.date) ? OptionsStyles.enabled : OptionsStyles.disabled}
                            onClick={() => {
                                if (opt.condition(props.status, props.date)) opt.action(props.actionId, props.status)
                            }}
                        >
                            {
                                opt.key === 'activeToggle' ?
                                    (props.status === 'INVITED' ? 'Resend Invite' :
                                        (props.status === 'ACTIVE' ? 'Deactivate' : 'Activate')) :
                                    opt.key
                            }
                        </p>
                    })
                }
            </div>
        </div>
    )
}

export default Options;