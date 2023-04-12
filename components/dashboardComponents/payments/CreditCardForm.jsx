import { AddressElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { joinClasses, secureLocalStorage } from "../../../helpers";
import { paymentService, userService } from "../../../services";
import { PaymentInfoStyles } from "../../../styles/elements";
import { Button } from "../../inputComponents";
import CreditCardInfoCard from "./CreditCardInfoCard";

const CreditCardForm = (props) => {

    const router = useRouter();

    const stripe = useStripe();
    const elements = useElements();

    const [cards, setCards] = useState();
    const [selectedCard, setSelectedCard] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (props.showSavedCards) {
            fetchCards();
        }
    }, [props.showSavedCards])

    const fetchCards = () => {
        paymentService.getAllCards()
            .then(res => {
                if (!res.error) {
                    setCards(res.map(card => {
                        if (card.default) setSelectedCard(card.id);
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

    const completePaymentInfo = (token) => {
        props.setPageLoading(true);
        userService.completePaymentInfo(token)
            .then(res => {
                if (res.wait) return;
                if (res.error) {
                    if (res.message) {
                        props.setToasterInfo({
                            error: true,
                            title: "Error!",
                            message: res.message,
                        })
                    }
                } else {
                    secureLocalStorage.saveData(userService.TOKEN_KEY, res.token);
                    props.setToken(res.token);
                    props.setToasterInfo({
                        error: false,
                        title: "Success!",
                        message: "Payment method added successfully",
                    })
                    return res.token;
                }
                return res;
            })
            .then(res => {
                if (!res.error) {
                    userService.getUser().then(res => {
                        secureLocalStorage.saveData(userService.USER_KEY, JSON.stringify(res));
                        props.setUser(res);
                    })
                        .then(() => router.push('/dashboard'))
                }
                props.setPageLoading(false);
            })
    }

    const addNewCard = (token) => {
        props.setPageLoading(true);
        paymentService.addNewCard(token)
            .then(res => {
                if (!res.error) {
                    props.setToasterInfo({
                        error: false,
                        title: "Success!",
                        message: "New card added successfully",
                    })
                }
                props.setPageLoading(false);
                props.setReloadData(true);
                props.hideModal();
            })
    }

    const confirmPayment = (card, addressData, redirect) => {
        stripe.confirmCardPayment(props.clientSecret, {
            payment_method: card ? {
                card: card,
                billing_details: addressData
            } : selectedCard
        })
            .then(res => {
                if (res.error) {
                    if (res.error.payment_intent.status === 'succeeded') {
                        
                    props.setToasterInfo({
                        error: true,
                        title: "Error!",
                        message: "You connot make this payment. This payment has already succeded",
                    })
                    } else {
                    props.setToasterInfo({
                        error: true,
                        title: "Error!",
                        message: res.error.message,
                    })
                }
                } else {
                    paymentService.confirmPayment(props.invoiceId, res.paymentIntent.id)
                        .then(res => {
                            if (!res.error) {
                                props.setToasterInfo({
                                    error: false,
                                    title: "Success!",
                                    message: "Payment Successful.",
                                })
                                if (redirect) router.push('/dashboard/payment-history')
                            }
                        })
                }
                props.setReloadData && props.setReloadData(true)
                props.setPageLoading(false);
                props.hideModal();
            })
    }

    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);
        props.setPageLoading(true);
        if (props.type === 'payment' && props.showSavedCards) {
            confirmPayment();
        } else if (!stripe || !elements) {
            props.setPageLoading(false);
            return;
        } else {
            const card = elements.getElement("card");
            elements.getElement("address").getValue()
                .then(res => {
                    return props.type === 'payment' ? {
                        address: res.value.address,
                        name: res.value.name
                    } : {
                        name: res.value.name,
                        address_line1: res.value.address.line1,
                        address_line2: res.value.address.line1,
                        address_city: res.value.address.city,
                        address_country: res.value.address.country,
                        address_state: res.value.address.state
                    }
                })
                .then(addressData => {
                    if (props.type === 'payment') {
                        confirmPayment(card, addressData, true);
                    } else {
                        stripe.createToken(card, addressData)
                            .then(res => {
                                const token = res.token.id;
                                if (props.type === 'addCard') {
                                    addNewCard(token);
                                } else {
                                    completePaymentInfo(token);
                                }
                            })
                    }
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            width: props.type === 'completeProfile' ? '80%' : '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {
                props.showSavedCards ?
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
                    </div> :
                    <>
                        <div className={PaymentInfoStyles.cardWrapper}>
                            <CardElement />
                        </div>
                        <AddressElement options={{ mode: 'billing' }} />
                    </>
            }
            <div style={{ height: '25px' }}></div>
            <Button
                type='dashboard'
                disabled={!stripe || submitting}
                onClick={handleSubmit}
                style={{ margin: 'auto' }}
            >
                Submit
            </Button>
        </form>
    )
}

export default CreditCardForm;