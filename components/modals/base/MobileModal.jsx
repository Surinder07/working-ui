import {MobileModalStyles} from "../../../styles/elements";
import {ArrowBack, Edit, Delete} from "@mui/icons-material";

const MobileModal = (props) => {
    const handleEdit = () => {};
    return (
        <div className={MobileModalStyles.container}>
            <ArrowBack className={MobileModalStyles.arrowBackIcon} />
            <div className={MobileModalStyles.header}>{props.header}</div>
            <div className={MobileModalStyles.actions}>
                {props.edit && <Edit className={MobileModalStyles.editIcon} onClick={() => props.setEditOn(true)} />} {props.delete && <Delete className={MobileModalStyles.deleteIcon} />}
            </div>
            <div className={MobileModalStyles.contentContainer}>{props.children}</div>
        </div>
    );
};

export default MobileModal;
