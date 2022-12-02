import { Notifications } from '@mui/icons-material';
import { useState } from 'react';
import styles from '../../styles/elements/Notifications.module.css';

const NotificationBell = (props) => {

    const [unread, setUnread] = useState(false);

    return (
        <div className={styles.container}>
            <Notifications className={styles.bell} />
            {unread && <div className={styles.unreadInd}></div>}
        </div>
    )
}

export default NotificationBell;