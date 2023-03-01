import { joinClasses } from "../../helpers";
import { ToasterStyles } from "../../styles/elements";
import { Close } from '@mui/icons-material';

const NotificationToaster = (props) => {
    return (
        <div className={joinClasses(ToasterStyles.notificationContainer,
            props.show ? ToasterStyles.visible : ToasterStyles.hidden)}>
                <Close onClick={() => props.setToast({
                    show: false,
                    title: '',
                    message: ''
                })} className={ToasterStyles.hideNotification}/>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    )
}

export default NotificationToaster;