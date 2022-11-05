import styles from '../styles/elements/Modal.module.css';

const Modal = (props) => {

    const closeModal = () => {
        props.setShowModal(false);
    }

    const modalClass = props.showModal ? 'flex' : 'none';
    
    return (
        <div className={styles.modalBackdrop} onClick={closeModal} style={{ display: `${modalClass}` }}>
            <div className={styles.modal}>
                <h3 className={styles.title}>{props.title}</h3>
                <p>{props.children}</p>
                <button className={styles.button} type="button" onClick={closeModal} >Accept and Close</button>
            </div>
        </div>
    )

}

export default Modal;