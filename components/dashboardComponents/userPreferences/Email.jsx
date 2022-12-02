import styles from '../../../styles/pages/UserPreference.module.css';
import UserPreferenceCard from './UserPreferenceCard';

const Email = (props) => {
    return (
        <div className={styles.profileContainer}>
            <h1>Email Preferences</h1>
            <p>Your current email address is <span>{props.email}</span></p>
        </div>
    )

}

export default Email;