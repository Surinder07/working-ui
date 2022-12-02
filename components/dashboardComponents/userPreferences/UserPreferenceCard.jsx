import styles from '../../../styles/pages/UserPreference.module.css';
import { Edit } from '@mui/icons-material';

const UserPreferenceCard = (props) => {
    return (
        <div className={styles.userPreferenceCard}>
            {
                props.title &&
                <div className={styles.cardTitle}>
                    <h3>{props.title}</h3>
                    {
                        props.isEditable &&
                        <div className={styles.editOption}>
                            {
                                props.editOn ?
                                    <>
                                        <p style={{color: '#CC5252'}} onClick={() => props.setEditOn(false)}>Cancel</p>
                                        <p style={{color: '#2996C3'}}>Save</p>
                                    </> :
                                    <p style={{color: '#2996C3'}} onClick={() => props.setEditOn(true)}><Edit className={styles.editIcon} /> Edit</p>
                            }
                        </div>
                    }
                </div>
            }
            <div className={styles.cardBody}>
                {props.children}
            </div>
        </div>
    )
}

export default UserPreferenceCard;