import { ModalStyles } from "../../styles/elements";
import { useRouter } from "next/router";
import { Close } from "@mui/icons-material";
import { Button } from "../inputComponents";
import { useEffect, useRef, useState } from "react";

/**
 *
 * @param {*} size pass small, medium , large or dashboardModal
 * @param {*} link if passed on button click it will redirect to said link
 * @param {*} buttonText text to be displayed on the button
 * @param {*} showModal whether to show the modal or not
 * @param {*} setShowModal function to set showModal value
 * @returns A full page modal with required content and a button at end
 */
const Modal = (props) => {

    const router = useRouter();

    const modalRef = useRef();
    const [scrollable, setScrollable] = useState(false);

    useEffect(() => {
        if (props.showModal) {
            document.body.style.overflow = "hidden";
            if (modalRef.current && window.innerHeight < modalRef.current.clientHeight) {
                setScrollable(true);
            } else {
                setScrollable(false);
            }
        }
    }, [props.showModal]);

    const handleClick = () => {
        props.setShowModal(false);
        document.body.style.overflow = "unset";
        if (props.link && props.link !== "") router.push(props.link);
    };

    return props.showModal ? (
        <div className={ModalStyles.modalBackdrop} style={scrollable && { overflowY: 'scroll' }}>
            <div className={`${ModalStyles.modal} ${ModalStyles[props.size]}`} ref={modalRef}>
                {props.showCloseButton && (
                    <Close
                        className={ModalStyles.closeIcon}
                        onClick={() => {
                            props.setShowModal(false);
                            document.body.style.overflow = "unset";
                        }}
                    />
                )}
                <div className={ModalStyles.subContainer}>
                    {props.children}
                    {typeof (props.buttonText) === "object" ? (
                        <div className={ModalStyles.multipleButtonStyle}>
                            {props.buttonText.map((button, index) => (
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
