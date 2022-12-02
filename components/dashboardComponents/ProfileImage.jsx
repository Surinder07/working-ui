import styles from '../../styles/elements/ProfileImage.module.css';
import LinkedImage from "../LinkedImage";
import Images from '../../public/Images';

const ProfileImage = (props) => {

    const height = props.size === 'small' ? 30 : 200;

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <LinkedImage
                    style={{ cursor: 'pointer' }}
                    height={height}
                    src={props.src ? props.src : Images.ProfilePlaceholderSmall}
                    alt={props.user && (props.user.firstName + ' ' + props.user.lastName)}
                    link={props.header && '/dashboard/userPreference'}
                />
            </div>
        </div>
    )
}

export default ProfileImage;