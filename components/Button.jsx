import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/elements/Button.module.css';

const Button = (props) => {

    const router = useRouter();
    const [buttonClass, setButtonClass] = useState(styles.defaultButton);

    useEffect(() => {
        if (props.type === 'default') setButtonClass(styles.defaultButton);
        else if (props.type === 'fullWidth') setButtonClass(styles.fullWidthButton);
        else if (props.type === 'social') setButtonClass(styles.socialButton);
    }, []);

    const onClick = (e) => {
        e.preventDefault();
        if (!props.disabled) {
            props.onClick && props.onClick();
            if (props.href) router.push(props.href);
        }
    }

    return (
        <button
            className={`${styles.button} ${buttonClass} ${props.disabled && styles.disabledButton} ${props.className}`}
            style={props.style}
            onClick={onClick}
        >
            {
                props.icon && (
                    props.icon.src ?
                        <Image
                            className={`${styles.icon} ${props.type === 'social' ? styles.socialIcon : styles.defaultIcon}`}
                            src={props.icon.src}
                            alt={props.icon.alt}
                            height={props.icon.height}
                            style={{ width: 'auto' }}
                        />
                        : <div style={{ display: 'flex', alignItems: 'center' }} className={`${styles.icon} ${props.type === 'social' ? styles.socialIcon : styles.defaultIcon}`}>
                            {props.icon.element}
                        </div>
                )
            }
            {props.children}</button>
    )
}

export default Button;