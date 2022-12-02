import styles from '../../../styles/pages/UserPreference.module.css';
import Images from '../../../public/Images';
import { CameraAlt } from '@mui/icons-material';
import { useState } from 'react';
import UserPreferenceCard from './UserPreferenceCard';
import EditableInput from './EditableInput';

const Profile = (props) => {

    const [uploadVisible, setUploadVisible] = useState(false);
    const [editPersonalDetails, setEditPersonalDetails] = useState(false);

    const handleChange = (e) => {
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
        <div className={styles.profileContainer}>
            <div className={styles.picContainer}>
                <div
                    className={styles.pic}
                    style={{ backgroundImage: `url(${props.img ? props.img : Images.ProfilePlaceholderLarge.src})` }}
                    onMouseEnter={() => setUploadVisible(true)}
                    onMouseLeave={() => setUploadVisible(false)}
                >
                    {
                        uploadVisible &&
                        <label className={styles.uploadContainer} htmlFor='upload-button'>
                            <div className={styles.uploadBox}>
                                <CameraAlt />
                                <p>Choose File</p>
                            </div>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />
                        </label>
                    }
                </div>
            </div>
            <div>
                <h1>Profile Preferences</h1>
                <div className={styles.twoHalves}>
                    <UserPreferenceCard
                        title='Personal Details'
                        isEditable
                        editOn={editPersonalDetails}
                        setEditOn={setEditPersonalDetails}
                    >
                        <EditableInput />
                    </UserPreferenceCard>
                    <UserPreferenceCard>Test</UserPreferenceCard>
                </div>
            </div>
        </div>
    )
}

export default Profile;