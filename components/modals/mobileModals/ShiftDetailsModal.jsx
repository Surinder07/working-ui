import { MobileModalStyles } from "../../../styles/elements";
import { ArrowBack, Edit, Delete } from "@mui/icons-material";
import { WaawNoIndexHead, EditableInput } from "../..";
import { DashboardStyles } from "../../../styles/pages";

const ShiftDetailsModal = (props) => {
    const shiftData = {
        requestId: 259999,
        requestType: "Name of Shift",
        initiationDate: "DD/MM/YYYY",
        initiatedBy: "Name",
        assignedTo: "Name",
        location: "Location",
        status: "Status",
    };

    return (
        <>
            <WaawNoIndexHead title="Shifts" />
            <div className={MobileModalStyles.container}>
                <ArrowBack className={MobileModalStyles.arrowBackIcon} />
                <div className={MobileModalStyles.header}>Shifts</div>
                <div className={MobileModalStyles.actions}>
                    <Edit className={MobileModalStyles.editIcon} />
                    <Delete className={MobileModalStyles.deleteIcon} />
                </div>
                <div className={DashboardStyles.shiftDetails}>
                    <div>
                        <h4>Shift Id</h4>
                        <p>259999</p>
                    </div>
                    <div>
                        <h4>Shift Name</h4>
                        <p>Name of Shift</p>
                    </div>
                    <div>
                        <h4>Creation Date</h4>
                        <p>Name of Shift</p>
                    </div>
                </div>
                <div className={MobileModalStyles.contentContainer}>
                    {Object.entries(shiftbData).map((info, key) => {
                        let name = info[0].replace(/([A-Z])/g, " $1").trim();
                        name = name.charAt(0).toUpperCase() + name.split(1);
                        let value = info[1];
                        return (
                            <>
                                <div className={MobileModalStyles.key}>{name}</div>
                                <div className={MobileModalStyles.value}>{value}</div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ShiftDetailsModal;
