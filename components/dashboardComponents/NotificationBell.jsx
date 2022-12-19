import { Notifications } from "@mui/icons-material";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { NotificationsStyles } from "../../styles/elements";
import Link from 'next/link';

const notifications = [
    {
        title: "Title of the Notification",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        date: "27/08/10",
        read: true
    },
    {
        title: "Title of the Notification",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        date: "27/08/10",
        read: false
    },
    {
        title: "Title of the Notification",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        date: "27/08/10",
        read: true
    },
    {
        title: "Title of the Notification",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        date: "27/08/10",
        read: true
    },
    {
        title: "Title of the Notification",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        date: "27/08/10",
        read: true
    },
];

const NotificationBell = (props) => {

    const ref = useRef();
    const containerRef = useRef();

    const [unread, setUnread] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [boxHeight, setBoxHeight] = useState(0);

    const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setShowNotifications(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        const unRead = notifications.some(notification => !notification.read);
        setUnread(unRead);
    }, [])

    useEffect(() => {
        if (ref.current) {
            setBoxHeight(ref.current.clientHeight + 100);
        }
    }, [ref.current])

    return (
        <div className={NotificationsStyles.container} ref={containerRef}>
            <Notifications
                className={NotificationsStyles.bell}
                onClick={() => {
                    setShowNotifications(!showNotifications);
                }}
            />
            {unread && <div className={NotificationsStyles.unreadInd}></div>}
            <div className={NotificationsStyles.notifications}
                style={{ height: showNotifications ? `${boxHeight}px` : 0, border: showNotifications ? '1px solid #94CAE1' : 'none' }}>
                <div className={NotificationsStyles.header}>
                    <h4>Notifications</h4>
                    <p>Mark all As Read</p>
                </div>
                <div className={NotificationsStyles.content} ref={ref}>
                    {notifications.map((notification, i) => (
                        <div className={`${NotificationsStyles.notification} ${notification.read && NotificationsStyles.readNotification}`} key={i}
                            style={{
                                borderBottom: notifications.length !== i + 1 ?
                                    '1.5px solid #999998' : 'none'
                            }}>
                            {!notification.read && <div className={NotificationsStyles.unreadInd}></div>}
                            <div className={NotificationsStyles.notificationHeader}>
                                <h4>{notification.title}</h4>
                                <p>{notification.date}</p>
                            </div>
                            <p className={NotificationsStyles.message}>{notification.message} </p>
                        </div>
                    ))}
                </div>
                <Link href='/dashboard/notifications'><p className={NotificationsStyles.bottomOption}>View All</p></Link>
            </div>
            {showNotifications && <span className={NotificationsStyles.notificationsPoint}></span>}
        </div>
    );
};

export default NotificationBell;
