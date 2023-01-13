import { UserPreferenceStyles } from '../../../styles/pages';
import { ProfilePlaceholderLarge } from '../../../public/images';
import { CameraAlt, Warning } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import UserPreferenceCard from './UserPreferenceCard';
import { EditableInput } from '../../inputComponents';
import Link from 'next/link';

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

    useEffect(() => {
        setFirstName(props.data.firstName);
        setLastName(props.data.lastName);
        setMobile({
            mobile: props.data.mobile,
            countryCode: props.data.countryCode,
            country: props.data.country
        });
    }, [])

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            handleUpload(e.target.files[0]);
            /**
            * @todo change image in user details
            */
        }
    }

    const handleUpload = async file => {
        console.log('data received', file);
        // const formData = new FormData();
        // formData.append("image", image.raw);

        // await fetch("YOUR_URL", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        //     body: formData
        // });
    };

    return (
        <div className={UserPreferenceStyles.profileContainer}>
            <div className={UserPreferenceStyles.picContainer}>
                <div
                    className={UserPreferenceStyles.pic}
                    style={{ backgroundImage: `url(${props.img ? props.img : ProfilePlaceholderLarge.src})` }}
                    onMouseEnter={() => setUploadVisible(true)}
                    onMouseLeave={() => setUploadVisible(false)}
                >
                    {
                        uploadVisible &&
                        <label className={UserPreferenceStyles.uploadContainer} htmlFor='upload-button'>
                            <div className={UserPreferenceStyles.uploadBox}>
                                <CameraAlt />
                                <p>Choose File</p>
                            </div>
                            {/* <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            /> */}
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
                        initialValue={props.data.firstName}
                        editOn={editPersonalDetails}
                        required
                    />
                    <EditableInput
                        type='text'
                        label='Last Name'
                        value={lastName}
                        setValue={setLastName}
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