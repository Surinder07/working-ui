import styles from '../styles/SubscribeBar.module.css';
import { ArrowForward } from "@mui/icons-material";
import { useState } from 'react';
import Modal from './Modal';
import firebase from "firebase";

const SubscribeBar = (props) => {

    const buttonStyle = {
        backgroundColor: props.buttonColor,
        color: props.buttonText
    }

    const barStyle = {
        backgroundColor: props.background
    }

    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    var firebaseApp = !firebase.apps.length ? firebase.initializeApp({
        // Your firebase credentials
        apiKey: "AIzaSyC9hb4US1VRHJqcYE4yZ9jQeOM6h6vJycE",
        authDomain: "waaw-waitlist.firebaseapp.com",
        projectId: "waaw-waitlist",
        storageBucket: "waaw-waitlist.appspot.com",
        messagingSenderId: "213804837638",
        appId: "1:213804837638:web:074369716cbebca22b0c87",
        measurementId: "G-YXEDFG0Y60"
    }) : firebase.app();

    var db = firebaseApp.firestore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        db.collection("waitlist")
            .add({
                email: email
            })
            .then(() => {
                setModalTitle('Thankyou for your interest');
                setModalMessage('We have successfuly added you to our wait list.');
                setShowModal(true);
                setEmail("");

            })
            .catch((error) => {
                setModalTitle('Error');
                setModalMessage('There was some issue while connecting to sever. Please try again later.');
                setShowModal(true);
            });
        setEmail("");
    };

    return (
        <div className={styles.inputBar} style={barStyle}>
            <Modal
                showModal={showModal}
                title={modalTitle}
                setShowModal={setShowModal}
            >
                {modalMessage}
            </Modal>
            <input id='email' type="email" autoComplete='off' placeholder='Your Email'
                value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type='submit' style={buttonStyle} onClick={handleSubmit}>{<ArrowForward />}</button>
        </div>
    )
}

export default SubscribeBar;