import { Notifications } from '@mui/icons-material';
import { useState } from 'react';
import { NotificationsStyles } from '../../styles/elements';

const NotificationBell = (props) => {

    const [unread, setUnread] = useState(false);

    return (
        <div className={NotificationsStyles.container}>
            <Notifications className={NotificationsStyles.bell} />
            {unread && <div className={NotificationsStyles.unreadInd}></div>}
        </div>
    )
}

export default NotificationBell;