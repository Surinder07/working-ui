import { ProfileImageStyles } from '../../styles/elements';
import LinkedImage from "../LinkedImage";
import { ProfilePlaceholderSmall } from '../../public/images';
import { joinClasses } from '../../helpers';
import { Logout, Settings, AccountCircle } from "@mui/icons-material";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { userService } from '../../services';

const ProfileImage = (props) => {

    const ref = useRef();

    const height = props.size === 'small' ? 30 : 150;
    const [openDrop, setOpenDrop] = useState(false);

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpenDrop(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div
            ref={ref}
            className={joinClasses(ProfileImageStyles.container, props.className)}
            style={{ height: `${height + (0.06 * height)}px`, width: `${height + (0.06 * height)}px` }}
        >
            <div
                onClick={() => setOpenDrop(!openDrop)}
                className={ProfileImageStyles.subContainer}
                style={{ height: `${height}px`, width: `${height}px` }}
            >
                <LinkedImage
                    heightOrient
                    style={{ cursor: 'pointer', height: `${height}px` }}
                    src={props.src ? props.src : ProfilePlaceholderSmall}
                    alt={props.user ? (props.user.firstName + ' ' + props.user.lastName) : 'profile'}
                    link={(props.header && !props.dropdown) ? '/dashboard/user/preference' : '#'}
                />
            </div>
            {
                props.dropdown &&
                <div className={joinClasses(ProfileImageStyles.dropDown, openDrop ? ProfileImageStyles.dropOpen : ProfileImageStyles.dropClose)}>
                    <Link
                        onClick={() => setOpenDrop(false)}
                        href='/dashboard/user/preference'
                        className={ProfileImageStyles.option}
                    >
                        <AccountCircle className={ProfileImageStyles.dropIcon} />
                        <p>My Profile</p>
                    </Link>
                    <Link
                        onClick={() => setOpenDrop(false)}
                        href="/dashboard/settings"
                        className={joinClasses(ProfileImageStyles.option, ProfileImageStyles.middleOption)}
                    >
                        <Settings className={ProfileImageStyles.dropIcon} />
                        <p>Settings</p>
                    </Link>
                    <div
                        className={ProfileImageStyles.option}
                        onClick={() => {
                            setOpenDrop(false);
                            userService.logout();
                        }}
                    >
                        <Logout className={ProfileImageStyles.dropIcon} />
                        <p>Log Out</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfileImage;