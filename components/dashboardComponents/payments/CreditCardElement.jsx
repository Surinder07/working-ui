import { Close } from "@mui/icons-material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useRef, useState } from "react";
import { joinClasses } from "../../../helpers";
import { paymentService } from "../../../services";
import { PaymentInfoStyles } from "../../../styles/elements";
import CreditCardForm from "./CreditCardForm";

let stripePromise;

const CreditCardElement = (props) => {

    const modalRef = useRef();

    const [selected, setSelected] = useState(props.hideSavedCards ? 'c' : 's');
    const [options, setOptions] = useState({
        clientSecret: '',
        appearance: {
            theme: 'stripe',
            variables: {
                fontFamily: props.type === 'completeProfile' ? 'Poppins' : 'Mulish',
                borderRadius: '4px',
            }
        },
        fonts: [{
            cssSrc: `https://fonts.googleapis.com/css2?family=${props.type === 'completeProfile' ? 'Poppins' : 'Mulish'}&display=swap`
        }]
    });

    const getPaymentOrSetupIntent = async () => {
        return props.type === 'payment' ? paymentService.createPaymentIntent(props.invoiceId) : paymentService.createSetupIntent();
    }

    useEffect(() => {
        if (props.modal && props.modal.show && modalRef.current) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [modalRef.current, props.modal]);

    useEffect(() => {
        if (props.type === 'payment' && props.invoiceId === '') return;
        props.setPageLoading(true);
        stripePromise = loadStripe(process.env.stripeKey);
        getPaymentOrSetupIntent()
            .then(res => {
                if (!res.error) {
                    setOptions({
                        ...options,
                        clientSecret: res.clientSecret
                    })
                }
                props.setPageLoading(false);
            })
            .catch(() => props.setPageLoading(false));
    }, [props.invoiceId])

    return (
        (props.modal && props.modal.show) ?
            <div className={PaymentInfoStyles.paymentsBackDrop} ref={modalRef} style={{ overflowY: 'scroll' }}>
                <div className={PaymentInfoStyles.paymentsContainer}>
                    {props.modal && <Close className={PaymentInfoStyles.closeIcon} onClick={() => props.setModal({ show: false })} />}
                    {
                        props.type === 'addCard' ?
                            <h1>Add A <span style={{ color: '#28A8E0' }}>New Card</span></h1> :
                            <h1>Pay for invoice# <span style={{ color: '#28A8E0' }}>{props.invoice}</span></h1>
                    }
                    <div
                        className={joinClasses(props.type === 'payment' && PaymentInfoStyles.paymentsSubContainer)}
                        style={props.type !== 'payment' ? { width: '80%' } : {}}
                    >
                        {
                            props.type === 'payment' &&
                            <div className={PaymentInfoStyles.priceContainer}>
                                <h3>Description</h3>
                                <p>{props.description}</p>
                                <p><b>Total: </b>{props.total}</p>
                            </div>
                        }
                        <div className={PaymentInfoStyles.optionsContainer}>
                            <div>
                                {
                                    props.type === 'payment' &&
                                    <div className={PaymentInfoStyles.optionsChoices}>
                                        <p
                                            onClick={() => setSelected('c')}
                                            className={joinClasses(selected === 'c' && PaymentInfoStyles.selected)}
                                        >Credit Card</p>
                                        {
                                            props.showSavedCards &&
                                            <p
                                                onClick={() => setSelected('s')}
                                                className={joinClasses(selected === 's' && PaymentInfoStyles.selected)}
                                            >Saved Methods</p>
                                        }
                                    </div>
                                }
                                <div className={PaymentInfoStyles.optionsNewCard}>
                                    {
                                        (stripePromise && options.clientSecret !== '') &&
                                        <Elements stripe={stripePromise} options={options}>
                                            <CreditCardForm
                                                type={props.type}
                                                setPageLoading={props.setPageLoading}
                                                setToasterInfo={props.setToasterInfo}
                                                setUser={props.setUser}
                                                setToken={props.setToken}
                                                showSavedCards={props.showSavedCards && selected === 's'}
                                                setReloadData={props.setReloadData}
                                                hideModal={() => props.setModal && props.setModal({ show: false })}
                                                clientSecret={options.clientSecret}
                                                invoiceId={props.invoiceId}
                                            />
                                        </Elements>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : (!props.modal ?
                (stripePromise && options.clientSecret !== '') &&
                <Elements stripe={stripePromise} options={options}>
                    <CreditCardForm
                        type={props.type}
                        setPageLoading={props.setPageLoading}
                        setToasterInfo={props.setToasterInfo}
                        setUser={props.setUser}
                        setToken={props.setToken}
                        showSavedCards={props.showSavedCards && selected === 's'}
                    />
                </Elements> :
                <></>
            )
    )

}

export default CreditCardElement;