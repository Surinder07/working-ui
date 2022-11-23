import styles from '../styles/elements/Modal.module.css';
import Button from './Button';

const SuccessModal = (props) => {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.successModal}>
                <div className={styles.successCircle}>
                    <div className={styles.successTick}></div>
                </div>
                <h1>{props.title}</h1>
                <p>{props.message}</p>
                <Button
                    type='default'
                    onClick={props.onButtonClick}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default SuccessModal;