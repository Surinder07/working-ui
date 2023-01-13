import { useEffect, useState } from "react";
import { Button, InputBox, LinkedImage } from "../../components";
import { PaymentStyles } from "../../styles/pages";
import { AmericanExpress, Visa, MasterCard } from "../../public/images";
import { combineBoolean, joinClasses, validateForEmptyField } from "../../helpers";
import InputBoxCard from "../../components/inputComponents/inputBoxes/InputBoxCard";

const Payment = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "fullPage",
            activeMenu: "none",
            activeSubMenu: "none",
        });
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [expiry, setExpiry] = useState('');
    const [code, setCode] = useState('');
    const [firstNameError, setFirstNameError] = useState({});
    const [lastNameError, setLastNameError] = useState({});
    const [countryError, setCountryError] = useState({});
    const [postalCodeError, setPostalCodeError] = useState({});
    const [addressError, setAddressError] = useState({});
    const [creditCardError, setCreditCardError] = useState({});
    const [expiryError, setExpiryError] = useState({});
    const [codeError, setCodeError] = useState({});

    const getLabel = (inputName, display) => {
        return <label htmlFor={inputName}>{display} <span style={{ color: "#CC5252" }}>*</span></label>
    }

    const isError = () => {
        return combineBoolean(
            validateForEmptyField(firstName, 'First Name', setFirstNameError, true),
            validateForEmptyField(lastName, 'Last Name', setLastNameError, true),
            validateForEmptyField(creditCard, 'Credit Card Number', setCreditCardError, true),
            validateForEmptyField(expiry, 'Expiry', setExpiryError, true),
            validateForEmptyField(code, 'Security Code', setCodeError, true),
            validateForEmptyField(country, 'Country', setCountryError, true),
            validateForEmptyField(postalCode, 'Postal Code', setPostalCodeError, true),
            validateForEmptyField(address, 'Billing Address', setAddressError, true)
        )
    }

    const submitInfo = () => {
        if (!isError()) {

        }
    }

    return (
        <div className={PaymentStyles.page}>
            <div className={PaymentStyles.mainContainer}>
            <legend>ADD <span style={{ color: '#000' }}>PAYMENT INFO</span></legend>
                <div className={PaymentStyles.creditCardContainer}>
                    <div className={PaymentStyles.creditCardTextContainer}>
                        <div className={PaymentStyles.verticalCenter}>
                            <div className={PaymentStyles.bullet}>
                                <div className={PaymentStyles.nestedBullet}></div>
                            </div>
                        </div>
                        <h4>Credit Card</h4>
                        <div></div>
                        <p>Safe money transfer using your bank account only using credit cards.</p>
                    </div>
                    <div className={PaymentStyles.cardImages}>
                        <LinkedImage className={PaymentStyles.cardImage} src={AmericanExpress} alt='american express' heightOrient />
                        <LinkedImage className={PaymentStyles.cardImage} src={Visa} alt='visa' heightOrient />
                        <LinkedImage className={PaymentStyles.cardImage} src={MasterCard} alt='mastercard' heightOrient />
                    </div>
                </div>
                <div className={PaymentStyles.gridContainer}>
                    <div>
                        {getLabel("firstName", "First Name")}
                        <InputBox
                            type="user"
                            name="firstName"
                            id='firstName'
                            value={firstName}
                            setValue={setFirstName}
                            errorMessage={firstNameError.message}
                            showError={firstNameError.show}
                            setShowError={(val) => setFirstNameError({...firstNameError, show: val})}
                        />
                    </div>
                    <div>
                        {getLabel("lastName", "Last Name")}
                        <InputBox
                            type="user"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            setValue={setLastName}
                            errorMessage={lastNameError.message}
                            showError={lastNameError.show}
                            setShowError={(val) => setLastNameError({...lastNameError, show: val})}
                        />
                    </div>
                    <div>
                        {getLabel("creditCardNumber", "Credit Card Number")}
                        <InputBoxCard
                            type="card"
                            name="creditCardNumber"
                            id="creditCardNumber"
                            value={creditCard}
                            setValue={setCreditCard}
                            errorMessage={creditCardError.message}
                            showError={creditCardError.show}
                            setShowError={(val) => setCreditCardError({...creditCardError, show: val})}
                        />
                    </div>
                    <div className={PaymentStyles.gridContainer}>
                        <div>
                            {getLabel("expirationDate", "Expiry")}
                            <InputBoxCard
                                type="expiry"
                                name="expirationDate"
                                id="expirationDate"
                                placeholder="MM/YYYY"
                                value={expiry}
                                setValue={setExpiry}
                                errorMessage={expiryError.message}
                                showError={expiryError.show}
                                setShowError={(val) => setExpiryError({...expiryError, show: val})}
                            />
                        </div>
                        <div>
                            {getLabel("securityDate", "Security Code")}
                            <InputBoxCard
                                type="code"
                                name="securityDate"
                                id="securityDate"
                                value={code}
                                setValue={setCode}
                                errorMessage={codeError.message}
                                showError={codeError.show}
                                setShowError={(val) => setCodeError({...codeError, show: val})}
                            />
                        </div>
                    </div>
                    <div>
                        {getLabel("country", "Country")}
                        <InputBox
                            type="country"
                            name="country"
                            id="country"
                            value={country}
                            setValue={setCountry}
                            errorMessage={countryError.message}
                            showError={countryError.show}
                            setShowError={(val) => setCountryError({...countryError, show: val})}
                        />
                    </div>

                    <div>
                        {getLabel("postalCode", "Postal Code")}
                        <InputBox
                            type="postal"
                            name="postalCode"
                            id="postalCode"
                            value={postalCode}
                            setValue={setPostalCode}
                            errorMessage={postalCodeError.message}
                            showError={postalCodeError.show}
                            setShowError={(val) => setPostalCodeError({...postalCodeError, show: val})}
                        />
                    </div>
                    <div className={PaymentStyles.twoColSpan}>
                        {getLabel("address", "Full Billing Address")}
                        <InputBox
                            type="address"
                            name="address"
                            id="address"
                            value={address}
                            setValue={setAddress}
                            errorMessage={addressError.message}
                            showError={addressError.show}
                            setShowError={(val) => setAddressError({...addressError, show: val})}
                        />
                    </div>
                    <Button
                        type="default"
                        onClick={submitInfo}
                        className={joinClasses(PaymentStyles.twoColSpan, PaymentStyles.button)}
                    >
                        Save
                    </Button>
                    <p className={PaymentStyles.requiredMessage}>* Required Fields</p>
                </div>
            </div>
        </div>
    );
};

export default Payment;
