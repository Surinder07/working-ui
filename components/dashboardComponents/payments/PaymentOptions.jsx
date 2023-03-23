import { useEffect, useRef, useState } from 'react';
import { joinClasses, secureLocalStorage } from '../../../helpers';
import { DashboardModalStyles, PaymentInfoStyles } from '../../../styles/elements';
import { Button } from '../../inputComponents';
import CreditCardInfoCard from './CreditCardInfoCard';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { paymentService, userService } from "../../../services";
import CreditCardElement from './CreditCardElement';
import { useRouter } from 'next/router';

let stripePromise;

const PaymentOptions = (props) => {

    const modalRef = useRef();
    const router = useRouter();
    const [scrollable, setScrollable] = useState(false);
    const [selected, setSelected] = useState(props.hideSavedCards ? 'c' : 's');
    const [selectedCard, setSelectedCard] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const [cards, setCards] = useState([]);
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
        cards.filter(card => card.default)
            .map(card => setSelectedCard(card.id));
        if (cards.length === 0 && !props.hideSavedCards) {
            paymentService.getAllCards()
                .then(res => {
                    if (!res.error) {
                        setCards(res.map(card => {
                            return {
                                id: card.id,
                                brand: card.brand,
                                cvcChecked: card.cvcChecked,
                                month: card.expiryMonth,
                                year: card.expiryYear,
                                last4: card.lastFourDigits,
                                default: card.default
                            }
                        }))
                    }
                })
        }
    }, []);

    useEffect(() => {
        if (props.modal && props.modal.show && props.modal.invoiceId && invoiceId !== props.modal.invoiceId) {
            props.setPageLoading(true)
            setInvoiceId(props.modal.invoiceId);
            stripePromise = loadStripe(process.env.stripeKey);
            paymentService.createPaymentIntent(props.modal.invoiceId)
                .then(res => {
                    if (!res.error) {
                        setOptions({
                            ...options,
                            clientSecret: res.clientSecret
                        })
                    }
                    props.setPageLoading(false);
                })
                .catch(e => props.setPageLoading(false));
        }
    }, [props.modal.invoiceId])

    useEffect(() => {
        if (props.modal.show && modalRef.current) {
            document.body.style.overflow = "hidden";
            setScrollable(true);
        }
    }, [modalRef.current, props.modal.show]);

    return (
        props.modal.show ?
            <div className={joinClasses(PaymentInfoStyles.paymentsBackDrop, scrollable && DashboardModalStyles.scrollBackdrop)} ref={modalRef}>
                <div className={PaymentInfoStyles.paymentsContainer}>
                    <h1>Pay for invoice# <span style={{ color: '#28A8E0' }}>{props.invoice}</span></h1>
                    <div className={PaymentInfoStyles.paymentsSubContainer}>
                        <div className={PaymentInfoStyles.priceContainer}>
                            <h3>Description</h3>
                            <p>{props.description}</p>
                            <p><b>Total: </b>{props.total}</p>
                        </div>
                        <div className={PaymentInfoStyles.optionsContainer}>
                            <div>
                                <div className={PaymentInfoStyles.optionsChoices}>
                                    <p
                                        onClick={() => setSelected('c')}
                                        className={joinClasses(selected === 'c' && PaymentInfoStyles.selected)}
                                    >Credit Card</p>
                                    {
                                        !props.hideSavedCards &&
                                        <p
                                            onClick={() => setSelected('s')}
                                            className={joinClasses(selected === 's' && PaymentInfoStyles.selected)}
                                        >Saved Methods</p>
                                    }
                                </div>
                                <div className={PaymentInfoStyles.optionsNewCard}>
                                    {
                                        (stripePromise && options.clientSecret !== '') &&
                                        <Elements stripe={stripePromise} options={options}>
                                            <CreditCardElement
                                                type={'make payment'}
                                                hide
                                                setPageLoading={props.setPageLoading}
                                                setToasterInfo={props.setToasterInfo}
                                                setUser={props.setUser}
                                                setToken={props.setToken}
                                            />
                                        </Elements>
                                    }
                                </div>
                                {
                                    selected === 's' &&
                                    <div className={PaymentInfoStyles.optionsSavedMethods}>
                                        {
                                            cards ? (
                                                cards.length > 0 ?
                                                    cards.map((card, key) => (
                                                        <div
                                                            onClick={() => setSelectedCard(card.id)}
                                                            className={PaymentInfoStyles.cardChoiceWrapper}
                                                        >
                                                            <span>
                                                                <span className={joinClasses(selectedCard === card.id && PaymentInfoStyles.selected)}></span>
                                                            </span>
                                                            <CreditCardInfoCard
                                                                key={key}
                                                                id={card.id}
                                                                brand={card.brand}
                                                                cvcChecked={card.cvcChecked}
                                                                month={card.month}
                                                                year={card.year}
                                                                last4={card.last4}
                                                                default={card.default}
                                                            />
                                                        </div>
                                                    )) :
                                                    <p>No Cards to show</p>
                                            ) : <p>Loading...</p>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <Button type='dashboard' onClick={() => {
                        paymentService.confirmPayment(invoiceId)
                            .then(res => {
                                if (res.error) {
                                } else {
                                    props.setReloadData ? props.setReloadData(true) :
                                        router.push('/dashboard/payment-history');
                                    secureLocalStorage.saveData(userService.TOKEN_KEY, res.token);
                                    props.setToken(res.token);
                                    props.setToasterInfo({
                                        error: false,
                                        title: "Success!",
                                        message: "Payment successfull",
                                    })
                                    document.body.style.overflow = "unset";
                                    return res.token;
                                }
                                return res;
                            })
                            .then(res => {
                                if (!res.error) {
                                    userService.getUser().then(res => {
                                        secureLocalStorage.saveData(userService.USER_KEY, JSON.stringify(res));
                                        props.setUser(res);
                                        return res.status;
                                    })
                                        .then((res) => {
                                            router.push('/dashboard/payment-history');
                                        })
                                }
                            })
                    }} >Make Payment</Button>
                </div>
            </div> :
            <></>
    )
}

export default PaymentOptions;