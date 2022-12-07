import React, { useState } from 'react'
import DropDown from '../../../components/inputComponents/DropDown';
import Modal from '../../../components/modals/Modal'
import styleshere from '../../../styles/elements/Modal.module.css'
const Reports = () => {

    const locationname = ["Canada", "India", "United States"];

//   const [clicked, setClicked] = useState("0");
  const [showModal, setShowModal] = useState(true);
  const buttonText = ["Submit", "Cancel"];

  const handleModal = () => {
    setShowModal(true);
  };

  return (
    <div>
          <Modal
        size="small"
        setShowModal={setShowModal}
        showModal={showModal}
        buttonText={buttonText}
      >
        <div className={styleshere.smallModalMainContainer}>
          <div className={styleshere.smallModalUpperdiv}>
            <div>
              <p>From</p>
              <input type="date" />
            </div>
            <div>
              <p>Till</p>
              <input type="date" />
            </div>
          </div>
        </div>
        <br />
        <div className={styleshere.smallModalLocationDropDown}>
          <DropDown defaultDisplay={locationname[0]} options={locationname} />
        </div>
      </Modal>

    </div>
  )
}

export default Reports