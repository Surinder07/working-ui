import {Notifications} from "@mui/icons-material";
import {useState} from "react";
import {NotificationsStyles} from "../../styles/elements";

const NotificationBell = (props) => {
    const [unread, setUnread] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        {
            title: "Title of the Notification",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            date: "27/08/10",
        },
        {
            title: "Title of the Notification",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            date: "27/08/10",
        },
        {
            title: "Title of the Notification",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            date: "27/08/10",
        },
        {
            title: "Title of the Notification",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            date: "27/08/10",
        },
        {
            title: "Title of the Notification",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            date: "27/08/10",
        },
    ];

    return (
        <div className={NotificationsStyles.container}>
            <Notifications
                className={NotificationsStyles.bell}
                onClick={() => {
                    setShowNotifications(!showNotifications);
                }}
            />
            {unread && <div className={NotificationsStyles.unreadInd}></div>}
            {showNotifications && (
                <div className={NotificationsStyles.notifications}>
                    <div className={NotificationsStyles.header}>
                        <h4>Notifications</h4>
                        <p>Mark all As Read</p>
                    </div>
                    <div className={NotificationsStyles.content}>
                        {notifications.map((notification) => (
                            <div className={NotificationsStyles.notification}>
                                <div className={NotificationsStyles.notificationHeader}>
                                    <h4>{notification.title}</h4>
                                    <p>{notification.date}</p>
                                </div>
                                <p className={NotificationsStyles.message}>{notification.message} </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
