import React, { useEffect } from "react";
import { useState } from "react";
import { fetchAndHandle, validateForEmptyField } from "../../helpers";
import { requestService } from "../../services";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";

const EditRequestsModal = (props) => {

    const responseOptions = ['Approve', 'Reject', 'Refer Back'];

    const [choice, setChoice] = useState(responseOptions[0]);
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState({});
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setChoice("")
        setComment("")
        setCommentError({})
    }

    const isError = () => {
        return validateForEmptyField(comment, 'comment', setCommentError, true)
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(() => requestService.update({}), "Responded to request successfully",
                setLoading, props.setReloadData, props.setPageLoading, onCancel, props.setShowModal,
                props.setToasterInfo)
            //     setLoading(true)
            //     if(error == true){
            //         props.setToasterInfo({
            //             error: true,
            //             title: 'Error!',
            //             message: res.message
            //         })
            //     }
            //     else{
            //         props.setToasterInfo({
            //             error: false,
            //             title: 'Success!',
            //             message: 'User invited successfully'
            //         });
            //         props.setReloadData(true)
            //         onCancel()
            //     }
            //     setLoading(false)
            // })
        }
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Respond to Request"
            type="singleCol"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            {
                props.tabularType === 'emp' &&
                <EditableInput
                    type="radio"
                    label="Response"
                    options={responseOptions}
                    value={choice}
                    setValue={setChoice}
                    editOn
                />
            }
            <EditableInput
                type="textarea"
                label="Comment"
                value={comment}
                setValue={setComment}
                initialValue={comment}
                error={commentError}
                setError={setCommentError}
                required
                editOn
            />
        </DashboardModal>
    );
};

export default EditRequestsModal;
