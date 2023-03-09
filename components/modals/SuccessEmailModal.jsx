import { Modal } from "./base";
import { ResetPasswordInitSuccessBg } from "../../public/images";
import { FullPageLayout } from "../../styles/layouts";

const SuccessEmailModal = (props) => {
    return (
        <Modal
            size='medium'
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText='Ok'
        >
            <div className={FullPageLayout.successBg} style={{ backgroundImage: `url(${ResetPasswordInitSuccessBg.src})` }}>
            </div>
            <h1>{props.title}</h1>
            <h3>{props.message}</h3>
        </Modal>
    )
}

export default SuccessEmailModal;