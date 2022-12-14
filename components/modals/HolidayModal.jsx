import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { CloudUpload } from "@mui/icons-material";

const HolidayModal = (props) => {

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Upload Holiday"
            type="twoColWide"
        >
            <div className={`${DashboardModalStyles.singleColumn} ${DashboardModalStyles.uploadContainer}`}>
                <CloudUpload className={DashboardModalStyles.icon} />
                <label htmlFor="upload">Select file to Import</label>
                <input type="file" id="upload" style={{ display: "none" }} />
                <p>Must be .xlsx or .csv file using our email template</p>
                <p>Click <span className={DashboardModalStyles.download}>here</span> to download template</p>
            </div>
        </DashboardModal>
    );
};

export default HolidayModal;