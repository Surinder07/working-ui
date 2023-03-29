import { useEffect } from "react";
import { useRouter } from 'next/router';
import { CreditCardElement, LinkedImage } from "../../components";
import { PaymentStyles } from "../../styles/pages";
import { AmericanExpress, Visa, MasterCard } from "../../public/images";

const Payment = (props) => {

    const router = useRouter();

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "fullPage",
            activeMenu: "none",
            activeSubMenu: "none",
        });
    }, []);

    useEffect(() => {
        if (props.user.status && props.user.status !== 'PAYMENT_INFO_PENDING') {
            router.push('/dashboard');
        }
    }, [props.user])

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
                <CreditCardElement
                    type='completeProfile'
                    setPageLoading={props.setPageLoading}
                    setToasterInfo={props.setToasterInfo}
                    setUser={props.setUser}
                    setToken={props.setToken}
                />
            </div>
        </div>
    );
};

export default Payment;
