import { useState } from "react";
import { combineBoolean, fetchAndHandle, validateForEmptyField } from "../../helpers";
import { requestService } from "../../services";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";

const EditRequestsModal = (props) => {

    const responseOptions = ['Approve', 'Reject', 'Refer Back'];

    const [choice, setChoice] = useState(responseOptions[0]);
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState({});
    const [choiceError, setChoiceError] = useState({});
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setChoice("")
        setComment("")
        setCommentError({})
        setChoiceError({})
    }

    const isError = () => {
        return combineBoolean(
            validateForEmptyField(comment, 'comment', setCommentError, true),
            validateForEmptyField(choice, 'choice', setChoiceError, props.tabularType === 'emp')
        )
    }

    const capitalizeAndAddUnderScore = (string) => {
        return string.toUpperCase().replace(" ", "_");
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(() => requestService.update({ id: props.id, response: capitalizeAndAddUnderScore(choice), comment }),
                "Responded to request successfully", setLoading, props.setReloadData, props.setPageLoading, onCancel,
                props.setShowModal, props.setToasterInfo);
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
                    error={choiceError}
                    setError={setChoiceError}
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
