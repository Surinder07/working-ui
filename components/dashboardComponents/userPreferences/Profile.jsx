import { UserPreferenceStyles } from '../../../styles/pages';
import { ProfilePlaceholderLarge } from '../../../public/images';
import { CameraAlt, Warning } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import UserPreferenceCard from './UserPreferenceCard';
import { EditableInput } from '../../inputComponents';
import Link from 'next/link';
import { userService } from '../../../services';
import { combineBoolean, validateForEmptyField } from '../../../helpers';

const Profile = (props) => {

    const [uploadVisible, setUploadVisible] = useState(false);
    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [mobile, setMobile] = useState({
        mobile: '',
        countryCode: '',
        country: ''
    });
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorFirstName, setErrorFirstName] = useState({});
    const [errorLastName, setErrorLastName] = useState({});

    useEffect(() => {
        setFirstName(props.data.firstName);
        setLastName(props.data.lastName);
        setMobile({
            mobile: props.data.mobile,
            countryCode: props.data.countryCode,
            country: props.data.country
        });
    }, []);

    const allowedTypes = ['image/jpeg', 'image/png'];

    const handleUpload = (e) => {
        if (e.target.files.length) {
            const type = e.target.files[0].type;
            if(!allowedTypes.includes(type)) {
                props.setToaster({
                    error: true,
                    title: "Error",
                    message: "Please upload only jpeg or png image file",
                })
                return;
            }
            userService.updateProfileImage(e.target.files[0])
                .then(res => {
                    if (!res.error) {
                        props.setToaster({
                            error: false,
                            title: "Success",
                            message: 'Profile picture updated successfully.',
                        })
                        window.location.reload();
                    } else {
                        props.setToaster({
                            error: true,
                            title: "Error",
                            message: "Something went wrong. Please try again later",
                        })
                    }
                })
        }
    };

    const updateProfileDetails = () => {
        if (!isError()) {
            props.setLoading(true);
            userService.updateLoggedUserDetails({ firstName, lastName, ...mobile })
            .then(res => {
                if (res.error) {
                    props.setToaster({
                        error: true,
                        title: "Error",
                        message: res.message,
                    })
                } else {
                    props.setToaster({
                        error: false,
                        title: "Success",
                        message: 'Profile updated successfully.',
                    })
                }
                props.setLoading(false);
            })
            .catch(() => props.setLoading(false))
        }
    }

    const isError = () => {
        return combineBoolean(
            validateForEmptyField(firstName, 'First Name', setErrorFirstName, true),
            validateForEmptyField(lastName, 'Last Name', setErrorLastName, true)
        )
    }

    const handleCancel = () => {
        setFirstName(props.data.firstName);
        setLastName(props.data.lastName);
        setMobile({
            mobile: props.data.mobile,
            country: props.data.country,
            countryCode: props.data.countryCode
        })
        setErrorFirstName({});
        setErrorLastName({});
    }

    return (
        <div className={UserPreferenceStyles.profileContainer}>
            <div className={UserPreferenceStyles.picContainer}>
                <div
                    className={UserPreferenceStyles.pic}
                    style={{ backgroundImage: `url(${props.data.imageUrl ? props.data.imageUrl : ProfilePlaceholderLarge.src})` }}
                    onMouseEnter={() => setUploadVisible(true)}
                    onMouseLeave={() => setUploadVisible(false)}
                >
                    {
                        uploadVisible &&
                        <label className={UserPreferenceStyles.uploadContainer} htmlFor='upload-button'>
                            <div className={UserPreferenceStyles.uploadBox}>
                                <p><CameraAlt /> Choose File</p>
                            </div>
                            <div className={UserPreferenceStyles.uploadBox}>
                                <p>{`(.jpeg / .png)`}</p>
                            </div>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleUpload}
                            />
                        </label>
                    }
                </div>
            </div>
            <div>
                <h1>Profile Preferences</h1>
                <UserPreferenceCard
                    title='Personal Details'
                    isEditable={props.data.role === 'ADMIN'}
                    editOn={editPersonalDetails}
                    setEditOn={setEditPersonalDetails}
                    onSave={updateProfileDetails}
                    handleCancel={handleCancel}
                >
                    {
                        props.data.role !== 'ADMIN' &&
                        <p className={UserPreferenceStyles.warnMessage}>
                            <Warning className={UserPreferenceStyles.warnIcon} />
                            {'To update any Personal Information, please'}&nbsp;
                            <Link href='/dashboard/requests'>raise a request</Link>
                            &nbsp;{'with admin.'}
                        </p>
                    }
                    <EditableInput
                        type='text'
                        label='First Name'
                        value={firstName}
                        setValue={setFirstName}
                        error={errorFirstName}
                        setError={setErrorFirstName}
                        initialValue={props.data.firstName}
                        editOn={editPersonalDetails}
                        required
                    />
                    <EditableInput
                        type='text'
                        label='Last Name'
                        value={lastName}
                        setValue={setLastName}
                        error={errorLastName}
                        setError={setErrorLastName}
                        initialValue={props.data.lastName}
                        editOn={editPersonalDetails}
                        required
                    />
                    <EditableInput
                        type='mobile'
                        label='Mobile No.'
                        value={mobile}
                        setValue={setMobile}
                        initialValue={{
                            mobile: props.data.mobile,
                            countryCode: props.data.countryCode,
                            country: props.data.country
                        }}
                        editOn={editPersonalDetails}
                    />
                    <EditableInput
                        type='text'
                        label='WAAW ID'
                        value={props.data.waawId}
                        initialValue={props.data.waawId}
                        editOn={editPersonalDetails}
                        nonEditable
                    />
                </UserPreferenceCard>
            </div>
        </div>
    )
}

export default Profile;