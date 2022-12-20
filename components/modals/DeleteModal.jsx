import React, { useEffect } from 'react'
import {DeleteModalStyles } from '../../styles/elements'
import { Button } from '../inputComponents'
const DeleteModal = (props) => {

    useEffect(() => {
        if (props.showModal) {
            document.body.style.overflow = "hidden";
        }
    }, []);


    const handleClick = () => {
        document.body.style.overflow = "unset";
        props.setShowModal(false);
    };
  return (
    <div className={DeleteModalStyles.modalBackdrop}>
        <div className={DeleteModalStyles.modal}>
          <div className={DeleteModalStyles.subContainer}>
                    <h1>{props.title}</h1>
                    <h1>Are you sure you want to delete this?</h1>
                    <div>
                        {props.children}
                        <p>This will be permanently deleted from your account</p>
                    </div>
                    <div className={DeleteModalStyles.buttonContainer}>
                         <Button type="close" onClick={() => handleClick(2)}>
                            Cancel
                        </Button>
                        <Button type="dashboard" onClick={() => handleClick(1)}>
                            {props.buttonText}
                        </Button>
                       
                    </div>
                </div>
                </div>
    </div>
  )
}

export default DeleteModal