import { useEffect } from 'react'
import { DashboardModalStyles } from '../../styles/elements'
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
        props.modal.show ?
            <div className={DashboardModalStyles.modalBackdrop}>
                <div className={`${DashboardModalStyles.modal} ${DashboardModalStyles.deleteModal}`}>
                    <div className={DashboardModalStyles.subContainer}>
                        <h1>{props.title}</h1>
                        <h1>Are you sure you want to delete this?</h1>
                        <div>
                            {props.children}
                            <p>This will be permanently deleted from your account</p>
                        </div>
                        <div className={DashboardModalStyles.buttonContainer}>
                            <Button type="cancel" onClick={() => handleClick(2)}>
                                Cancel
                            </Button>
                            <Button type="delete" onClick={() => handleClick(1)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div> :
            <></>
    )
}

export default DeleteModal