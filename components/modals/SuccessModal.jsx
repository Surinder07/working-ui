import { ModalStyles } from '../../styles/elements';
import Modal from './Modal';

const SuccessModal = (props) => {
    return (
        <Modal
            size='medium'
            buttonText='Continue'
            link={props.link}
            showModal={props.showModal}
            setShowModal={props.setShowModal}
        >
            <div className={ModalStyles.successCircle}>
                <div className={ModalStyles.successTick}></div>
            </div>
            <h1>{props.title}</h1>
            <h3>{props.message}</h3>
        </Modal>
    );
}

export default SuccessModal;