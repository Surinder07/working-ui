import styles from "../../styles/elements/Modal.module.css";
import { useRouter } from "next/router";
import { Close } from "@mui/icons-material";
import Button from "../Button";
import { useEffect } from "react";

/**
 *
 * @param {*} size pass small, medium or large
 * @param {*} link if passed on button click it will redirect to said link
 * @param {*} buttonText text to be displayed on the button
 * @param {*} showModal whether to show the modal or not
 * @param {*} setShowModal function to set showModal value
 * @returns A full page modal with required content and a button at end
 */
const Modal = (props) => {
  const router = useRouter();
  useEffect(() => {
    if (props.showModal) {
      document.body.style.overflow = "hidden";
    }
  },[ props.showModal]);

  const handleClick = () => {
    props.setShowModal(false);
    document.body.style.overflow = "unset";
    if (props.link && props.link !== "") router.push(props.link);
  };

  return props.showModal ? (
    <div className={styles.modalBackdrop}>
      <div className={`${styles.modal} ${styles[props.size]}`}>
        {props.showCloseButton && (
          <Close
            className={styles.closeIcon}
            onClick={() => {
              props.setShowModal(false);
              document.body.style.overflow = "unset";
            }}
          />
        )}
        <div className={styles.subContainer}>
          {props.children}
          {typeof(props.buttonText)=== "object" ? (
           <div className={styles.multipleButtonStyle}>
            { props.buttonText.map((button,index) => (
              <Button type="default" key={index} onClick={handleClick}>
                {button}
              </Button>
            ))}
           </div>
          ) : (
            <Button type="default" onClick={handleClick}>
              {props.buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
