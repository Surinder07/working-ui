import { useEffect, useState } from "react"
import InputBox from '../../components/inputComponents/InputBox';
import ContactInput from "../../components/inputComponents/ContactInput";
import styles from '../../styles/pages/LoginRegister.module.css';
import layoutStyles from '../../styles/layouts/LoginRegistration.module.css';
import { userService } from '../../services/user.service';
import { dropdownService } from "../../services/dropdown.service";
import DropDown from "../../components/inputComponents/DropDown";
import { DayOfWeeks } from "../../constants";
import InputWithButton from "../../components/inputComponents/InputWithButton";
import LoginRegistrationLayout from "../../layouts/LoginRegistrationLayout";
import Button from "../../components/Button";

const CompleteProfile = (props) => {

    const [timezones, setTimezones] = useState([]); // List to display

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [mobile, setMobile] = useState('');
    const [organization, setOrganization] = useState('');
    const [weekStartOn, setWeekStartOn] = useState('Monday');
    const [timezone, setTimezone] = useState('');
    const [showErrorFirstName, setShowErrorFirstName] = useState(false);
    const [showErrorLastName, setShowErrorLastName] = useState(false);
    const [showErrorUsername, setShowErrorUsername] = useState(false);
    const [showErrorUsernameMessage, setShowErrorUsernameMessage] = useState(false);
    const [showErrorMobile, setShowErrorMobile] = useState(false);
    const [showErrorOrganization, setShowErrorOrganization] = useState(false);
    const [showErrorTimezone, setShowErrorTimezone] = useState('');
    const [promoError, setPromoError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dropdownService.getTimezones().then(res => setTimezones(res));
    }, [])

    const onSubmit = () => {
        if (validateFields()) return;
        /**
         * @todo add submit logic
         */
    }

    return (
        <LoginRegistrationLayout
        pageTitle='Complete Profile'
        setActiveMenu={props.setActiveMenu}
        background='/bg/complete-registration-bg.svg'
        logoRight
        >
            <legend>COMPLETE <span style={{ color: '#000' }}>YOUR PROFILE</span></legend>
            <div className={styles.formType}>Personal Details / Organization Details </div>
            <div className={layoutStyles.twoHalves}>
                <InputBox
                    type='user'
                    name='firstName'
                    placeholder='First Name'
                    value={firstName}
                    setValue={setFirstName}
                    style={{ marginTop: 0 }}
                    errorMessage={'First name is required'}
                    setShowError={setShowErrorFirstName}
                />
                <InputBox
                    type='user'
                    name='lastName'
                    placeholder='Last Name'
                    value={lastName}
                    setValue={setLastName}
                    style={{ marginTop: 0 }}
                    errorMessage={'Last name is required'}
                    setShowError={setShowErrorLastName}
                />
            </div>
            <InputBox
                type='user'
                name='username'
                placeholder='Username'
                value={username}
                setValue={setUsername}
                style={{ marginTop: 0 }}
                errorMessage={'Username is required'}
                setShowError={setShowErrorUsername}
            />
            <ContactInput
                mobile={mobile}
                setMobile={setMobile}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                style={{ marginTop: 0 }}
                errorMessage={'Enter a valid number'}
                setShowError={setShowErrorMobile}
            />
            <InputBox
                type='org'
                name='organization'
                placeholder='Organization Name'
                value={organization}
                setValue={setOrganization}
                style={{ marginTop: 0 }}
                errorMessage={'Organization name is required'}
                setShowError={setShowErrorOrganization}
            />
            <div className={layoutStyles.twoHalves}>
                <DropDown options={DayOfWeeks}
                    defaultDisplay={'Week Start On'}
                    setValue={setWeekStartOn}
                />
                <DropDown options={timezones}
                    defaultDisplay={'Timezone'}
                    setValue={setTimezone}
                    errorMessage={'Timezone name is required'}
                    setShowError={setShowErrorTimezone}
                />
            </div>
            <div className={layoutStyles.twoHalves}>
                <InputWithButton
                    style={{ marginTop: '40px' }}
                    placeholder='Promo Code'
                    buttonText='Apply'
                // onClick={handlePromoCode}
                // message={promoMessage}
                // error={promoError}
                // showMessage={true}
                // setValue={promoValue}
                />
            </div>
            <div className={layoutStyles.twoHalves}>
                <Button
                    type='fullWidth'
                    onClick={onSubmit}
                    disabled={loading}
                >Complete Profile</Button>
            </div>
        </LoginRegistrationLayout>
    );
}

export default CompleteProfile;