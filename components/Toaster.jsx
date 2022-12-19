import { ToasterStyles } from "../styles/elements";
import { CheckCircle, Cancel } from '@mui/icons-material';

const Toaster = (props) => {
    return (
        <div className={`
            ${ToasterStyles.container} 
            ${props.error ? ToasterStyles.error : ToasterStyles.default}
            ${props.show ? ToasterStyles.visible : ToasterStyles.hidden}
            `}
            style={props.style}>
            <div className={ToasterStyles.iconContainer}>
                {props.error ? <Cancel className={ToasterStyles.icon} /> : <CheckCircle className={ToasterStyles.icon} />}
            </div>
            <div className={ToasterStyles.messageContainer}>
                <h1>{props.title}</h1>
                <p>{props.message}</p>
            </div>
        </div>
    )
}

export default Toaster;