import { useEffect, useState } from "react"
import { useRouter } from 'next/router';
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
import { validateUsername } from "../../helpers";

const CompleteProfile = (props) => {

    const router = useRouter();
    const [timezones, setTimezones] = useState([]); // List to display

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState({
        countryCode: '',
        mobile: '',
        country: ''
    })
    const [organization, setOrganization] = useState('');
    const [weekStartOn, setWeekStartOn] = useState('Monday');
    const [timezone, setTimezone] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [showErrorFirstName, setShowErrorFirstName] = useState(false);
    const [showErrorLastName, setShowErrorLastName] = useState(false);
    const [showErrorUsername, setShowErrorUsername] = useState(false);
    const [errorUsernameMessage, setErrorUsernameMessage] = useState('');
    const [showErrorMobile, setShowErrorMobile] = useState(false);
    const [showErrorOrganization, setShowErrorOrganization] = useState(false);
    const [showErrorTimezone, setShowErrorTimezone] = useState(false);
    const [promoMessage, setPromoMessage] = useState({});
    const [promoValue, setPromoValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');
    const [submitError, setSubmitError] = useState(false);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: 'fullPage',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
        dropdownService.getTimezones().then(res => setTimezones(res));
    }, [])

    const validateFields = async () => {
        let error = false;
        if (firstName === '') {
            setShowErrorFirstName(true);
            error = true
        }
        if (lastName === '') {
            setShowErrorLastName(true);
            error = true
        }
        if (username === '') {
            setErrorUsernameMessage('Field is required');
            setShowErrorUsername(true);
            error = true;
        } else {
            const err = !validateUsername(username);
            setErrorUsernameMessage('Invalid username');
            setShowErrorUsername(err);
            if (err) error = true;
        }
        if (mobile !== '' && mobile.length < 10) {
            setShowErrorMobile(true);
            error = true;
        }
        if (organization === '') {
            setShowErrorOrganization(true);
            error = true;
        }
        if (timezone === '') {
            setShowErrorTimezone(true);
            error = true;
        }
        return error;
    }

    const handlePromoCode = () => {
        setPromoMessage({
            error: true,
            showMessage: true,
            message: 'Propmo code is expired'
        })
    }

    const onSubmit = () => {
        if (loading) return;
        validateFields()
            .then(error => {
                if (!error) {
                    setLoading(true);
                    userService.completeProfile({
                        firstName, lastName, username, countryCode, mobile,
                        organizationName: organization, firstDayOfWeek: weekStartOn,
                        timezone, promoCode
                    })
                        .then(res => {
                            if (res.error) {
                                setSubmitErrorMessage(res.message);
                                setSubmitError(true);
                                setTimeout(() => setSubmitError(false), 3000);
                                setLoading(false);
                            } else {
                                router.push('/account/payment-info');
                            }
                        })
                }
            })
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
                    errorMessage={'Field is required'}
                    showError={showErrorFirstName}
                    setShowError={setShowErrorFirstName}
                />
                <InputBox
                    type='user'
                    name='lastName'
                    placeholder='Last Name'
                    value={lastName}
                    setValue={setLastName}
                    style={{ marginTop: 0 }}
                    errorMessage={'Field is required'}
                    showError={showErrorLastName}
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
                errorMessage={errorUsernameMessage}
                showError={showErrorUsername}
                setShowError={setShowErrorUsername}
            />
            <ContactInput
                value={contact}
                setValue={setContact}
                style={{ marginTop: 0 }}
                errorMessage={'Enter a valid number'}
                showError={showErrorMobile}
                setShowError={setShowErrorMobile}
            />
            <InputBox
                type='org'
                name='organization'
                placeholder='Organization Name'
                value={organization}
                setValue={setOrganization}
                style={{ marginTop: 0 }}
                errorMessage={'Field is required'}
                showError={showErrorOrganization}
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
                    errorMessage={'Field is required'}
                    showError={showErrorTimezone}
                    setShowError={setShowErrorTimezone}
                />
            </div>
            <div className={layoutStyles.twoHalves} style={{ position: 'relative' }}>
                <InputWithButton
                    style={{ marginTop: '40px' }}
                    placeholder='Promo Code'
                    buttonText='Apply'
                    onClick={handlePromoCode}
                    message={promoMessage.message}
                    error={promoMessage.error}
                    showMessage={promoMessage.showMessage}
                    setValue={promoValue}
                />
                {submitError && <p className={layoutStyles.errorTextUp}>{submitErrorMessage}</p>}
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