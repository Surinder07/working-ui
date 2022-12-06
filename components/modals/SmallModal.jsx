import React, { useState } from "react";
import Modal from "./Modal";
import DropDown from "../inputComponents/DropDown";
import styles from "../../styles/elements/Modal.module.css";
const SmallModal = (props) => {
    // const [showModal,setShowModal] = useState(false)
    const buttonText = ["Continue", "Cancel"];
    // const handleModal = ()=>{
    // props.setShowModal(true);
    // }
    const options = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

    return (
        <div>
            {/* <Button type="default" onClick={handleModal}>
            Modal Button
          </Button> */}
            <Modal
                size="small"
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText={buttonText}
            >
                <div className={styles.smallModalMainContainer}>
                    <div className={styles.smallModalUpperdiv}>
                        <div>
                            <p>In Time</p>
                            <span
                                style={{ display: "flex" }}
                                className={styles.modalDropDown}
                            >
                                <DropDown defaultDisplay={options[0]} options={options} />
                                <DropDown defaultDisplay={options[0]} options={options} />
                            </span>
                        </div>
                        <div>
                            <p>Out Time</p>
                            <span
                                style={{ display: "flex" }}
                                className={styles.modalDropDown}
                            >
                                <DropDown defaultDisplay={options[0]} options={options} />
                                <DropDown defaultDisplay={options[4]} options={options} />
                            </span>
                        </div>
                    </div>

                    <div className={styles.smallModalUpperdiv}>
                        <div>
                            <p>In Date</p>
                            <input type="date" />
                        </div>
                        <div>
                            <p>Out Date</p>
                            <input type="date" />
                        </div>
                    </div>
                </div>
                <label>Comment</label>
                <textarea className={styles.smallModalTextarea} required></textarea>
            </Modal>
        </div>
    );
};

export default SmallModal;
