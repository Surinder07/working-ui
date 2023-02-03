import { UserPreferenceStyles } from '../../../styles/pages';
import { Edit } from '@mui/icons-material';

const UserPreferenceCard = (props) => {

    const handleCancel = () => {
        props.setEditOn(false);
        props.handleCancel && props.handleCancel();
    }

    const handleSave = () => {
        props.onSave && props.onSave()
    }

    return (
        <div className={`${UserPreferenceStyles.userPreferenceCard}`}>
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
                                        <p style={{ color: '#CC5252' }} onClick={handleCancel}>Cancel</p>
                                        <p style={{ color: '#2996C3' }} onClick={handleSave}>Save</p>
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