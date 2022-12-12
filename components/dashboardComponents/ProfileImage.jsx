import { ProfileImageStyles } from '../../styles/elements';
import LinkedImage from "../LinkedImage";
import Images from '../../public/Images';

const ProfileImage = (props) => {

    const height = props.size === 'small' ? 30 : 150;

    return (
        <div className={ProfileImageStyles.container} style={{ height: `${height + (0.06 * height)}px`, width: `${height + (0.06 * height)}px` }}>
            <div className={ProfileImageStyles.subContainer} style={{ height: `${height}px`, width: `${height}px` }}>
                <LinkedImage
                    style={{ cursor: 'pointer' }}
                    height={height}
                    src={props.src ? props.src : Images.ProfilePlaceholderSmall}
                    alt={props.user && (props.user.firstName + ' ' + props.user.lastName)}
                    link={props.header ? '/dashboard/user/preference' : '#'}
                />
            </div>
        </div>
    )
}

export default ProfileImage;