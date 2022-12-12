import { UserPreferenceStyles } from '../../../styles/pages';
import { Edit } from '@mui/icons-material';

const UserPreferenceCard = (props) => {
    return (
        <div className={UserPreferenceStyles.userPreferenceCard}>
            {
                props.title &&
                <div className={UserPreferenceStyles.cardTitle}>
                    <h3>{props.title}</h3>
                    {
                        props.isEditable &&
                        <div className={UserPreferenceStyles.editOption}>
                            {
                                props.editOn ?
                                    <>
                                        <p style={{ color: '#CC5252' }} onClick={() => props.setEditOn(false)}>Cancel</p>
                                        <p style={{ color: '#2996C3' }}>Save</p>
                                    </> :
                                    <p style={{ color: '#2996C3' }} onClick={() => props.setEditOn(true)}><Edit className={UserPreferenceStyles.editIcon} /> Edit</p>
                            }
                        </div>
                    }
                </div>
            }
            <div className={UserPreferenceStyles.cardBody}>
                {props.children}
            </div>
        </div>
    )
}

export default UserPreferenceCard;