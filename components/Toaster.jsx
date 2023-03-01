import { ToasterStyles } from "../styles/elements";
import { CheckCircle, Cancel, Close } from '@mui/icons-material';
import { joinClasses } from "../helpers";

const Toaster = (props) => {
    return (
        <div className={joinClasses(
            ToasterStyles.container,
            props.error ? ToasterStyles.error : ToasterStyles.default,
            props.show ? ToasterStyles.visible : ToasterStyles.hidden
        )}
            style={props.style}>
            <Close onClick={() => props.setShowToaster(false)} className={ToasterStyles.hideNotification}/>
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