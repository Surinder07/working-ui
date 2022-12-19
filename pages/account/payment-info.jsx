import {useEffect} from "react";
import Image from "next/Image";
import {Button, InputBox} from "../../components";
import {PaymentStyles as styles} from "../../styles/pages";

const Payment = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "fullPage",
            activeMenu: "none",
            activeSubMenu: "none",
        });
    }, []);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.creditContainer}>
                <div className={styles.bullet}>
                    <div className={styles.nestedBullet}></div>
                </div>
                <div>
                    <h4 className={styles.header}>Credit Card</h4>
                    <p className={styles.description}>
                        Safe money transfer using your bank account <br /> only using credit cards.
                    </p>
                </div>
                <div className={styles.imageContainer}>
                    <Image src="/american-express.svg" width={50} height={50} />
                    <Image src="/visa.svg" width={60} height={60} />
                    <Image src="/mastercard.svg" width={60} height={60} />
                </div>
            </div>
            <div className={styles.gridContainer}>
                <div className={styles.leftGridContainer}>
                    <label htmlFor="firstName">
                        First Name <sup style={{color: "red"}}>*</sup>
                    </label>
                    <InputBox type="text" name="creditCardNumber" />
                    <label htmlFor="firstName">
                        Credit Card Number <sup style={{color: "red"}}>*</sup>
                    </label>
                    <InputBox type="text" name="creditCardNumber" />
                    <label htmlFor="country">
                        Country <sup style={{color: "red"}}>*</sup>
                    </label>
                    <InputBox type="text" name="country" />
                </div>
                <div className={styles.rightGridContainer}>
                    <label htmlFor="lastName">
                        Last Name <sup style={{color: "red"}}>*</sup>
                    </label>
                    <InputBox type="text" name="lastName" />
                    <div className={styles.flexContainer}>
                        <div>
                            <label htmlFor="expirationDate">
                                Expiration Date <sup style={{color: "red"}}>*</sup>
                            </label>
                            <InputBox type="text" name="expirationDate" placeholder="MM/YYYY" className={styles.inputHalfDivLeft} />
                        </div>
                        <div>
                            <label htmlFor="securityDate">
                                Security Code <sup style={{color: "red"}}>*</sup>
                            </label>
                            <InputBox type="text" name="securityDate" className={styles.inputHalfDivRight} />
                        </div>
                    </div>
                    <label htmlFor="postalCode">
                        Postal Code <sup style={{color: "red"}}>*</sup>
                    </label>
                    <InputBox type="text" name="postalCode" placeholder="Billing Postal Code" />
                </div>
            </div>
            <div className={styles.addressBar}>
                <label htmlFor="enterBillingAddress">
                    Address <sup style={{color: "red"}}>*</sup>
                </label>
                <InputBox type="text" name="enterBillingAddress" placeholder="Enter billing address" />
            </div>
            <p className={styles.fields}>
                <sup>*</sup>Required Fields
            </p>
            <Button style={({marginTop: "20px"}, {width: "300px"})}>Save</Button>
        </div>
    );
};

export default Payment;
