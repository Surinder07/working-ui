import { DashboardModalStyles } from "../../../styles/elements";
import { Button } from "../../inputComponents";
import { useEffect, useRef, useState } from "react";

/**
 * @param {*} type {twoColWide, twoColNarrow, singleCol}
 * @param {*} title Title to be shown on top of modal
 * @param {*} buttonText text to be displayed on the button
 * @param {*} onClick action to happen on click of button
 * @param {*} showModal whether to show the modal or not
 * @param {*} setShowModal function to set showModal value
 * @returns A full page modal with required content and two buttons at end
 */
const Modal = (props) => {

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
    }, [modalRef.current]);

    const handleClick = (action) => {
        if (action === 1) {
            props.onClick();
        }
        document.body.style.overflow = "unset";
        props.setShowModal(false);
    };

    const gridClass = props.type === 'twoColWide' ? DashboardModalStyles.gridDouble : props.type === 'twoColNarrow' ?
        DashboardModalStyles.gridDoubleNarrow : DashboardModalStyles.gridSingle

    return props.showModal ? (
        <div className={`${DashboardModalStyles.modalBackdrop} ${scrollable && DashboardModalStyles.scrollBackdrop}`}>
            <div className={`${DashboardModalStyles.modal}`} ref={modalRef} style={scrollable && {height: 'fit-content'}}>
                <div className={DashboardModalStyles.subContainer}>
                    <h1>{props.title}</h1>
                    <div className={gridClass}>
                        {props.children}
                    </div>
                    <div className={DashboardModalStyles.buttonContainer}>
                        <Button type="dashboard" onClick={() => handleClick(1)}>
                            {props.buttonText}
                        </Button>
                        <Button type="close" onClick={() => handleClick(2)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Modal;
