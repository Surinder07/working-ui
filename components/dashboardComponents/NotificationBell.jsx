import { Notifications } from "@mui/icons-material";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { NotificationsStyles } from "../../styles/elements";
import Link from 'next/link';
import { notificationService } from '../../services';
import { fetchAndHandle, joinClasses } from "../../helpers";

const NotificationBell = (props) => {

    const ref = useRef();
    const containerRef = useRef();

    const [showNotifications, setShowNotifications] = useState(false);
    const [boxHeight, setBoxHeight] = useState(0);

    const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setShowNotifications(false);
        }
    }

    const markAsRead = (id, read) => {
        if (!read) {
            fetchAndHandle(() => notificationService.markAsRead(id), "", null, null, props.setPageLoading,
                null, null, null, () => {
                    let newData = props.data;
                    newData = newData.map(item => {
                        if (item.internalId === id) {
                            return {
                                ...item, read: true
                            }
                        }
                        return item;
                    })
                    props.setData(newData);
                })
        }
    }

    const markAllAsRead = () => {
        fetchAndHandle(notificationService.markAllAsRead, null, null, props.setReloadData,
            props.setPageLoading, null, null, null, null)
    }

    useEffect(() => {
        if (showNotifications) props.setReloadData(true);
    }, [showNotifications])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    useEffect(() => {
        if (ref.current) {
            setBoxHeight(ref.current.clientHeight + 100);
        }
    }, [ref.current, props.data])

    return (
        <div className={NotificationsStyles.container} ref={containerRef}>
            <Notifications
                className={NotificationsStyles.bell}
                onClick={() => {
                    setShowNotifications(!showNotifications);
                }}
            />
            {props.unread && <div className={NotificationsStyles.unreadInd}></div>}
            <div className={NotificationsStyles.notifications}
                style={{ height: showNotifications ? `${boxHeight}px` : 0, border: showNotifications ? '1px solid #94CAE1' : 'none' }}>
                <div className={NotificationsStyles.header}>
                    <h4>Notifications</h4>
                    <p onClick={markAllAsRead}>Mark all As Read</p>
                </div>
                <div className={NotificationsStyles.content} ref={ref}>
                    {
                        props.data.length > 0 ?
                            props.data.map((notification, i) => (
                                <div
                                    key={i}
                                    className={joinClasses(NotificationsStyles.notification, notification.read && NotificationsStyles.readNotification)}
                                    style={{
                                        borderBottom: data.length !== i + 1 ? '1.5px solid #999998' : 'none'
                                    }}
                                    onClick={() => markAsRead(notification.internalId, notification.read)}>
                                    {!notification.read && <div className={NotificationsStyles.unreadInd}></div>}
                                    <div className={NotificationsStyles.notificationHeader}>
                                        <h4>{notification.title}</h4>
                                        <p>{notification.date}</p>
                                    </div>
                                    <p className={NotificationsStyles.message}>{notification.message} </p>
                                </div>
                            )) :
                            <div className={NotificationsStyles.notification}>
                                <p className={NotificationsStyles.message}>No data available</p>
                            </div>
                    }
                </div>
                <Link onClick={() => setShowNotifications(false)} href='/dashboard/notifications'><p className={NotificationsStyles.bottomOption}>View All</p></Link>
            </div>
            {showNotifications && <span className={NotificationsStyles.notificationsPoint}></span>}
        </div>
    );
};

export default NotificationBell;
