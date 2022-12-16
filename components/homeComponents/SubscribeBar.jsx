import { SubscribeBarStyles } from '../../styles/elements';
import { ArrowForward } from "@mui/icons-material";
import { useState } from 'react';
import { Modal } from '../modals';
import { firebaseDb } from '../../services/firebase.service';
import { RotatingLoader } from '../loaders';

const SubscribeBar = (props) => {

    const buttonStyle = {
        backgroundColor: props.buttonColor,
        color: props.buttonText
    }

    const barStyle = {
        ...props.style,
        backgroundColor: props.background,
    }

    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setModalTitle('Error');
            setModalMessage('Please enter a valid email.');
            setShowModal(true);
            return;
        }
        setShowLoader(true);
        firebaseDb.collection("waitlist")
            .add({
                email: email,
                date: new Date()
            })
            .then(() => {
                setModalTitle('Thankyou for your interest');
                setModalMessage('We have successfuly added you to our wait list.');
                setShowModal(true);
                setShowLoader(false);
            })
            .catch((error) => {
                setModalTitle('Error');
                setModalMessage('There was some issue while connecting to sever. Please try again later.');
                setShowModal(true);
                setShowLoader(false);
            });
        setEmail("");
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <div className={SubscribeBarStyles.inputBar} style={barStyle}>
            <Modal
                size='small'
                buttonText='Accept and Close'
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <h1>{modalTitle}</h1>
                <h3>{modalMessage}</h3>
            </Modal>
            <RotatingLoader visible={showLoader} />
            <input id='contactEmail' type="email" autoComplete='off' placeholder='Your Email'
                value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className={SubscribeBarStyles.button} type='submit' style={buttonStyle} onClick={handleSubmit}>{<ArrowForward />}</button>
        </div>
    )
}

export default SubscribeBar;