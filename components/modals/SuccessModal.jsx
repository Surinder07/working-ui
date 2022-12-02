import styles from '../../styles/elements/Modal.module.css';
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
            <div className={styles.successCircle}>
                <div className={styles.successTick}></div>
            </div>
            <h1>{props.title}</h1>
            <h3>{props.message}</h3>
        </Modal>
    );
}

export default SuccessModal;