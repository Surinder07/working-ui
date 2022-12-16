import { UserPreferenceStyles } from '../../../styles/pages';
import Images from '../../../public/Images';
import { CameraAlt } from '@mui/icons-material';
import { useState } from 'react';
import UserPreferenceCard from './UserPreferenceCard';
import { EditableInput } from '../../inputComponents';

const Profile = (props) => {

    const [uploadVisible, setUploadVisible] = useState(false);
    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [mobile, setMobile] = useState({
        mobile: '',
        countryCode: '',
        country: ''
    })
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [waawId,setWaawId] = useState("")
    const [initialFirstName,setInitialFirstName] = useState("")
    const [initialLastName,setInitialLastName] = useState("")
    const [initialMobile,setInitialMobile] = useState({
        mobile: '',
        countryCode: '',
        country: ''
    })


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
                    style={{ backgroundImage: `url(${props.img ? props.img : Images.ProfilePlaceholderLarge.src})` }}
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
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </label>
                    }
                </div>
            </div>
            <div>
                <h1>Profile Preferences</h1>
                <UserPreferenceCard
                    title='Personal Details'
                    isEditable
                    editOn={editPersonalDetails}
                    setEditOn={setEditPersonalDetails}
                >
                    <EditableInput type='text' label='First Name' value={firstName} setValue={setFirstName} initialValue={initialFirstName} editOn={editPersonalDetails} required/>
                    <EditableInput type='text' label='Last Name' value={lastName} setValue={setLastName} initialValue={initialLastName} editOn={editPersonalDetails} required/>
                    <EditableInput
                        type='mobile'
                        label='Mobile No.'
                        value={mobile}
                        setValue={setMobile}
                        initialValue={initialMobile}
                        editOn={editPersonalDetails}
                    />
                    <EditableInput type='text' label='WAAW ID' value={waawId} setValue={setWaawId} editOn={editPersonalDetails} nonEditable />
                </UserPreferenceCard>
            </div>
        </div>
    )
}

export default Profile;