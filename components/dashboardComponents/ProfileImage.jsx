import { ProfileImageStyles } from '../../styles/elements';
import LinkedImage from "../LinkedImage";
import { ProfilePlaceholderSmall } from '../../public/images';

const ProfileImage = (props) => {

    const height = props.size === 'small' ? 30 : 150;

    return (
        <div className={ProfileImageStyles.container} style={{ height: `${height + (0.06 * height)}px`, width: `${height + (0.06 * height)}px` }}>
            <div className={ProfileImageStyles.subContainer} style={{ height: `${height}px`, width: `${height}px` }}>
                <LinkedImage
                    style={{ cursor: 'pointer', height: `${height}px` }}
                    src={props.src ? props.src : ProfilePlaceholderSmall}
                    alt={props.user ? (props.user.firstName + ' ' + props.user.lastName) : 'profile'}
                    link={props.header ? '/dashboard/user/preference' : '#'}
                />
            </div>
        </div>
    )
}

export default ProfileImage;