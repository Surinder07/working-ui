import { Notifications } from "@mui/icons-material";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { NotificationsStyles } from "../../styles/elements";
import Link from 'next/link';
import { notificationService, userService } from '../../services';
import { fetchAndHandle, fetchAndHandlePage, fetchWrapper, getNotificationListingForBell, joinClasses, secureLocalStorage } from "../../helpers";
import SockJsClient from 'react-stomp';

const webSocketEndpoints = process.env.endpoints.webSocket;

const NotificationBell = (props) => {

    const ref = useRef();
    const containerRef = useRef();

    const [unread, setUnread] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [boxHeight, setBoxHeight] = useState(0);
    const [data, setData] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setShowNotifications(false);
        }
    }

    const loadNotification = () => {
        fetchAndHandlePage(() => notificationService.getAll(1, 5, {}, {}),
            setData, null, null, null, null, getNotificationListingForBell, null);
    }

    const markAsRead = (id, read) => {
        if (!read) {
            fetchAndHandle(() => notificationService.markAsRead(id), "", null, null, props.setPageLoading,
                null, null, null, () => {
                    let newData = data;
                    newData = newData.map(item => {
                        if (item.internalId === id) {
                            return {
                                ...item, read: true
                            }
                        }
                        return item;
                    })
                    setData(newData);
                })
        }
    }

    const markAllAsRead = () => {
        fetchAndHandle(notificationService.markAllAsRead, null, null, setReloadData,
            props.setPageLoading, null, null, null, null)
    }

    const updateNotification = (newData) => {
        props.setNotificationToast({
            show: true,
            title: newData.title,
            message: newData.description
        })
        data.pop();
        setData([{
            internalId: newData.id,
            title: newData.title,
            type: newData.type,
            date: 'now',
            read: newData.read,
            message: newData.description
        }].concat(data))
        setUnread(true);
    }

    useEffect(() => loadNotification(), [showNotifications])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    useEffect(() => {
        if (reloadData) loadNotification();
        setReloadData(false);
    }, [reloadData])

    useEffect(() => {
        const unRead = data.some(notification => !notification.read);
        setUnread(unRead);
    }, [data])

    useEffect(() => {
        if (ref.current) {
            setBoxHeight(ref.current.clientHeight + 100);
        }
    }, [ref.current, data])

    return (
        <div className={NotificationsStyles.container} ref={containerRef}>
            <SockJsClient url={fetchWrapper.getApiUrl(webSocketEndpoints.endpoint).replace('api/', '')}
                headers={{ access_token: secureLocalStorage.getData(userService.TOKEN_KEY) }}
                topics={[webSocketEndpoints.topics.notification]}
                onConnect={() => {
                    console.log("Connected to Websocket");
                }}
                onDisconnect={() => {
                    console.log("Disconnected from Websocket");
                }}
                onMessage={(msg) => {
                    updateNotification(msg);
                }}
                options={{ headers: { access_token: secureLocalStorage.getData(userService.TOKEN_KEY) } }}
                debug={false}
            />
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
                    <p onClick={markAllAsRead}>Mark all As Read</p>
                </div>
                <div className={NotificationsStyles.content} ref={ref}>
                    {
                        data.length > 0 ?
                            data.map((notification, i) => (
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
