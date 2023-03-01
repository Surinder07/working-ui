import { useEffect } from 'react'
import { DashboardModalStyles } from '../../styles/elements'
import { Button } from '../inputComponents'

const DeleteModal = (props) => {

    useEffect(() => {
        if (props.modal.show) {
            document.body.style.overflow = "hidden";
        }
    }, [props.modal]);


    const handleClick = (action) => {
        if (action === 1) {
            props.onSubmit && props.onSubmit()
        }
        document.body.style.overflow = "unset";
        props.setModal({
            ...props.modal,
            id: '',
            show: false,
            errorMessage: ''
        });
    };

    return (
        props.modal.show ?
            <div className={DashboardModalStyles.modalBackdrop}>
                <div className={`${DashboardModalStyles.modal} ${DashboardModalStyles.deleteModal}`}>
                    <div className={DashboardModalStyles.subContainer}>
                        <h1>{props.title}</h1>
                        <h1>{`Are you sure you want to ${props.disable ? 'deactivate' : 'delete'} this?`}</h1>
                        <div>
                            {
                                props.modal.errorMessage === '' ?
                                    (
                                        props.disable ?
                                            <p>{props.modal.disableMessage}</p> :
                                            <p>{props.modal.message}</p>
                                    ) :
                                    <p className={DashboardModalStyles.errorDeleteMessage}>
                                        {props.modal.errorMessage}
                                    </p>
                            }
                        </div>
                        <div className={DashboardModalStyles.buttonContainer}>
                            <Button type="cancel" onClick={() => handleClick(2)}>
                                Cancel
                            </Button>
                            <Button type="delete" onClick={() => handleClick(1)}>
                                {props.disable ? 'Deactivate' : 'Delete'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div> :
            <></>
    )
}

export default DeleteModal