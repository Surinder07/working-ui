import { DashboardModalStyles } from "../../../styles/elements";
import { Button } from "../../inputComponents";
import { useEffect, useRef, useState } from "react";
import { joinClasses } from "../../../helpers";

/**
 * @param {*} type {twoColWide, twoColNarrow, singleCol}
 * @param {*} title Title to be shown on top of modal
 * @param {*} buttonText text to be displayed on the button
 * @param {*} onClick action to happen on click of button
 * @param {*} showModal whether to show the modal or not
 * @param {*} setShowModal function to set showModal value
 * @returns A full page modal with required content and two buttons at end
 */
const DashboardModal = (props) => {

    const modalRef = useRef();
    const [scrollable, setScrollable] = useState(false);

    useEffect(() => {
        if (props.showModal && modalRef.current) {
            document.body.style.overflow = "hidden";
            if (modalRef.current && (window.innerHeight < modalRef.current.clientHeight)) {
                setScrollable(true);
            } else {
                setScrollable(false);
            }
        }
    }, [modalRef.current, props.showModal]);

    const handleClick = (action) => {
        if (action === 1) {
            props.onClick();
        } else {
            props.onCancel();
            props.setShowModal(false);
        }
        document.body.style.overflow = "unset";
    };

    const gridClass = props.type === 'twoColWide' ? DashboardModalStyles.gridDouble : props.type === 'twoColNarrow' ?
        DashboardModalStyles.gridDoubleNarrow : DashboardModalStyles.gridSingle

    return props.showModal ? (
        <div className={joinClasses(DashboardModalStyles.modalBackdrop, scrollable && DashboardModalStyles.scrollBackdrop)}>
            <div className={joinClasses(DashboardModalStyles.modal)} ref={modalRef} style={{height: scrollable ? 'fit-content' : 'unset'}}>
                <div className={DashboardModalStyles.subContainer}>
                    <h1>{props.title}</h1>
                    <div className={gridClass}>
                        {props.children}
                    </div>
                    <div className={DashboardModalStyles.buttonContainer}>
                        <Button type="dashboard" onClick={() => handleClick(1)} disabled={props.loading} >
                            {props.buttonText}
                        </Button>
                        <Button type="close" onClick={() => handleClick(2)} >
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

export default DashboardModal;
