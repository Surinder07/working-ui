import { useEffect, useState } from 'react';
import { paymentService } from '../../../services';
import { PaymentInfoStyles } from '../../../styles/elements';
import ComingSoonEl from '../../ComingSoonEl';
import { CreditCardInfoCard } from '../payments';

const PaymentMethods = (props) => {

    // const [cards, setCards] = useState();

    // useEffect(() => {
    //     paymentService.getAllCards()
    //         .then(res => {
    //             if (!res.error) {
    //                 setCards(res.map(card => {
    //                     return {
    //                         id: card.id,
    //                         brand: card.brand,
    //                         cvcChecked: card.cvcChecked,
    //                         month: card.expiryMonth,
    //                         year: card.expiryYear,
    //                         last4: card.lastFourDigits,
    //                         default: card.default
    //                     }
    //                 }))
    //             }
    //         })
    // }, [])

    return (
        // <div className={PaymentInfoStyles.userPreferenceCard}>
        //     <div>
        //         <h1 className={PaymentInfoStyles.paymentHeading}>Payment Methods</h1>
        //         <div className={PaymentInfoStyles.cardListWrapper}>
        //             {
        //                 cards ? (
        //                     cards.length > 0 ?
        //                         cards.map((card, key) => (
        //                             <CreditCardInfoCard
        //                                 key={key}
        //                                 id={card.id}
        //                                 brand={card.brand}
        //                                 cvcChecked={card.cvcChecked}
        //                                 month={card.month}
        //                                 year={card.year}
        //                                 last4={card.last4}
        //                                 default={card.default}
        //                             />
        //                         )) :
        //                         <p>No Cards to show</p>
        //                 ) : <p>Loading...</p>
        //             }
        //         </div>
        //     </div>
        // </div>
        <div style={{ height: '80vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ComingSoonEl dashboard />
        </div>

    )
}

export default PaymentMethods;