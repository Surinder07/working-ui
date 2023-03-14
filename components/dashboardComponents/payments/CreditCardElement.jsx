import { Button } from '@mui/material';
import { useStripe, useElements, CardElement, AddressElement } from '@stripe/react-stripe-js';
import { secureLocalStorage } from '../../../helpers';
import { userService } from '../../../services';
import { PaymentInfoStyles } from '../../../styles/elements';

const CreditCardElement = (props) => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement("card");
        elements.getElement("address").getValue()
            .then(res => {
                return {
                    name: res.value.name,
                    address_line1: res.value.address.line1,
                    address_line2: res.value.address.line1,
                    address_city: res.value.address.city,
                    address_country: res.value.address.country,
                    address_state: res.value.address.state
                }
            })
            .then(addressData => {
                stripe.createToken(card, addressData)
                    .then(res => {
                        const token = res.token.id;
                        if (props.type === 'completeProfile') {
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
                                            message: "Profile details saved successfully",
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
                        } else {
                            // add a card
                        }
                    })
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            <div className={PaymentInfoStyles.cardWrapper}>
                <CardElement />
            </div>
            <AddressElement options={{ mode: 'billing' }} />
            <Button type='dashboard' disabled={!stripe} onClick={handleSubmit}>Submit</Button>
        </form>
    )

}

export default CreditCardElement;