import { useEffect, useState } from 'react';
import { fetchAndHandle } from '../../../helpers';
import { paymentService } from '../../../services';
import { PaymentInfoStyles } from '../../../styles/elements';
import { Button } from '../../inputComponents';
import { DeleteModal } from '../../modals';
import { CreditCardElement, CreditCardInfoCard } from '../payments';

const PaymentMethods = (props) => {

    const [cards, setCards] = useState();
    const [addCard, setAddCard] = useState({
        show: false
    });
    const [reloadData, setReloadData] = useState(true);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        id: "",
        show: false,
        message: "This will permanently delete this card from your profile.",
        disableMessage: "",
        errorMessage: "",
        type: "delete",
    });

    useEffect(() => {
        if (reloadData) {
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
                    setReloadData(false);
                })
        }
    }, [reloadData])

    const deleteCard = () => {
        fetchAndHandle(
            () => paymentService.deleteCard(confirmDeleteModal.id),
            "Card Deleted Successfully",
            null,
            setReloadData,
            props.setLoading,
            null,
            null,
            props.setToaster
        );
    }

    return (
        <>
            <DeleteModal
                modal={confirmDeleteModal}
                setModal={setConfirmDeleteModal}
                onSubmit={deleteCard}
            >
                This will permanently delete this Card from your profile
            </DeleteModal>
            <CreditCardElement
                type='addCard'
                setPageLoading={props.setLoading}
                setToasterInfo={props.setToaster}
                modal={addCard}
                setModal={setAddCard}
                setReloadData={setReloadData}
            />
            <div className={PaymentInfoStyles.userPreferenceCard}>
                <div>
                    <h1 className={PaymentInfoStyles.paymentHeading}>Payment Methods</h1>
                    <div className={PaymentInfoStyles.cardListWrapper}>
                        {
                            cards ? (
                                cards.length > 0 ?
                                    cards.map((card, key) => (
                                        <CreditCardInfoCard
                                            key={key}
                                            id={card.id}
                                            brand={card.brand}
                                            cvcChecked={card.cvcChecked}
                                            month={card.month}
                                            year={card.year}
                                            last4={card.last4}
                                            default={card.default}
                                            allowDelete
                                            onDelete={() => {
                                                setConfirmDeleteModal({
                                                    ...confirmDeleteModal,
                                                    show: true,
                                                    id: card.id
                                                })
                                            }}
                                        />
                                    )) :
                                    <p>No Cards to show</p>
                            ) : <p>Loading...</p>
                        }
                    </div>
                </div>
                <Button onClick={() => setAddCard({ show: true })} type="plain" style={{
                    justifySelf: 'end',
                    alignSelf: 'flex-start',
                    marginTop: '35px'
                }}>
                    + Add a new Card
                </Button>
            </div>
        </>
    )
}

export default PaymentMethods;