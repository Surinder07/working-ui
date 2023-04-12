import { PaymentInfoStyles } from '../../../styles/elements';
import LinkedImage from '../../LinkedImage';
import {
    AmericanExpress,
    Diners,
    Discover,
    JCB,
    MasterCard,
    UnionPay,
    Visa
} from '../../../public/images';
import Options from '../Options';

const CreditCardInfoCard = (props) => {

    const getCardImage = () => {
        switch (props.brand.toLowerCase().replaceAll(' ', '')) {
            case 'visa':
                return Visa;
            case 'dinersclub':
                return Diners;
            case 'unionpay':
                return UnionPay;
            case 'jcb':
                return JCB;
            case 'discover':
                return Discover;
            case 'americanexpress':
                return AmericanExpress;
            case 'mastercard':
                return MasterCard;
        }
    }

    return (
        <div className={PaymentInfoStyles.cardDisplayWrapper}>
            <LinkedImage
                className={PaymentInfoStyles.brandImage}
                widthOrient
                src={getCardImage()}
                alt={props.brand}
            />
            <div>
                <p className={PaymentInfoStyles.cardDetails}>
                    <span className={PaymentInfoStyles.cardNumber}>**** **** **** {props.last4}</span>
                    {
                        props.default && <>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <span className={PaymentInfoStyles.defaultInfo}>(Default)</span>
                        </>
                    }
                </p>
                <p className={PaymentInfoStyles.expiryDate}>Expires: {`${props.month}/${props.year}`}</p>
            </div>
            {props.actions && <Options options={props.actions} actionId={props.id} status={props.default ? 'default' : ''} vertical />}
        </div>
    )
}

export default CreditCardInfoCard;