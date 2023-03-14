import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { CreditCardElement, LinkedImage } from "../../components";
import { PaymentStyles } from "../../styles/pages";
import { AmericanExpress, Visa, MasterCard } from "../../public/images";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { paymentService } from "../../services";

let stripePromise;

const Payment = (props) => {

    const router = useRouter();

    const [options, setOptions] = useState({
        clientSecret: '',
        appearance: {
            theme: 'stripe',
            variables: {
                fontFamily: 'Poppins',
                borderRadius: '4px',
            }
        },
        fonts: [{
            cssSrc: "https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        }]
    });

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "fullPage",
            activeMenu: "none",
            activeSubMenu: "none",
        });
        props.setPageLoading(true);
        stripePromise = loadStripe(process.env.stripeKey);
        paymentService.createSetupIntent()
            .then(res => {
                if (!res.error) {
                    setOptions({
                        ...options,
                        clientSecret: res.clientSecret
                    })
                }
                props.setPageLoading(false);
            })
            .catch(e => props.setPageLoading(false))
    }, []);

    useEffect(() => {
        props.setPageLoading(true);
        if (props.user.status && props.user.status !== 'PAYMENT_INFO_PENDING') {
            router.push('/dashboard');
        }
        props.setPageLoading(false);
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
                {
                    (stripePromise && options.clientSecret !== '') &&
                    <Elements stripe={stripePromise} options={options}>
                        <CreditCardElement
                            type={'completeProfile'}
                            setPageLoading={props.setPageLoading}
                            setToasterInfo={props.setToasterInfo}
                            setUser={props.setUser}
                            setToken={props.setToken}
                        />
                    </Elements>
                }
            </div>
        </div>
    );
};

export default Payment;
