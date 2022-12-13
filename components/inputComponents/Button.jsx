import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ButtonStyles } from '../../styles/elements/inputs';

const Button = (props) => {

    const router = useRouter();
    const [buttonClass, setButtonClass] = useState(ButtonStyles.defaultButton);

    useEffect(() => {
        if (props.type === 'default') setButtonClass(ButtonStyles.defaultButton);
        else if (props.type === 'fullWidth') setButtonClass(ButtonStyles.fullWidthButton);
        else if (props.type === 'social') setButtonClass(ButtonStyles.socialButton);
        else if (props.type === 'plain') setButtonClass(ButtonStyles.plainButton);
        else if (props.type === 'close') setButtonClass(ButtonStyles.closeButton);
        else if (props.type === 'dashboard') setButtonClass(ButtonStyles.dashboardButton);
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
            className={`${ButtonStyles.button} ${buttonClass} ${props.disabled && ButtonStyles.disabledButton} ${props.className}`}
            style={props.style}
            onClick={onClick}
        >
            {
                props.icon && (
                    props.icon.src ?
                        <Image
                            className={`${ButtonStyles.icon} ${props.type === 'social' ? ButtonStyles.socialIcon : ButtonStyles.defaultIcon}`}
                            src={props.icon.src}
                            alt={props.icon.alt}
                            height={props.icon.height}
                            style={{ width: 'auto' }}
                        />
                        : <div style={{ display: 'flex', alignItems: 'center' }} className={`${ButtonStyles.icon} ${props.type === 'social' ? ButtonStyles.socialIcon : ButtonStyles.defaultIcon}`}>
                            {props.icon.element}
                        </div>
                )
            }
            {props.children}</button>
    )
}

export default Button;