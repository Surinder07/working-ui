import { useEffect, useState } from 'react';
import { joinClasses } from '../../../helpers';
import { PaymentInfoStyles } from '../../../styles/elements';
import { Button } from '../../inputComponents';
import CreditCardInfoCard from './CreditCardInfoCard';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { paymentService } from "../../../services";
import CreditCardElement from './CreditCardElement';

let stripePromise;

const PaymentOptions = (props) => {

    const [selected, setSelected] = useState('s');
    const [selectedCard, setSelectedCard] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const [cards, setCards] = useState([]);
    const [description, setDescription] = useState('- : -');
    const [total, setTotal] = useState('-');
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
        if (selectedCard === '') {
            cards.filter(card => card.default)
                .map(card => setSelectedCard(card.id))
        }
        if (cards.length === 0) {
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
        if (props.modal && props.modal.show && invoiceId !== props.modal.invoiceId) {
            props.setPageLoading(true)
            setInvoiceId(props.modal.invoiceId);
            stripePromise = loadStripe(process.env.stripeKey);
            getAndUpdatePrice()
                .then(res => {
                    if (!res.error) {
                        paymentService.createPaymentIntent(props.invoiceId)
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
                });
        }
    }, [props.modal])

    const getAndUpdatePrice = async () => {
        return paymentService.getById(invoiceId)
            .then(res => {
                if (!res.error) {
                    setDescription(res.quantity + ' x ' + res.unitPrice + ' ' + res.currency);
                    setTotal(res.totalAmount + ' ' + res.currency);
                }
                return res;
            })
    }

    return (
        <div className={PaymentInfoStyles.paymentsBackDrop}>
            <div className={PaymentInfoStyles.paymentsContainer}>
                <h1>Pay for invoice# <span style={{ color: '#28A8E0' }}>{invoiceId}</span></h1>
                <div className={PaymentInfoStyles.paymentsSubContainer}>
                    <div className={PaymentInfoStyles.priceContainer}>
                        <h3>Description</h3>
                        <p>{description}</p>
                        <p><b>Total: </b>{total}</p>
                    </div>
                    <div className={PaymentInfoStyles.optionsContainer}>
                        <div>
                            <div className={PaymentInfoStyles.optionsChoices}>
                                <p
                                    onClick={() => setSelected('c')}
                                    className={joinClasses(selected === 'c' && PaymentInfoStyles.selected)}
                                >Credit Card</p>
                                <p
                                    onClick={() => setSelected('s')}
                                    className={joinClasses(selected === 's' && PaymentInfoStyles.selected)}
                                >Saved Methods</p>
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
                            if (!res.error) {
                                props.setReloadData(true);
                            }
                        })
                }} >Make Payment</Button>
            </div>
        </div>
    )
}

export default PaymentOptions;