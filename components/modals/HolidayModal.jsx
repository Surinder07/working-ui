import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { CloudUpload } from "@mui/icons-material";
import { fetchWrapper } from "../../helpers";
import Link from 'next/link';

const HolidayModal = (props) => {

    const fileEndpoint = process.env.endpoints.resources.fileTemplate;

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
                <p>
                        {`Download `}
                        <Link download href={fetchWrapper.getApiUrl(fileEndpoint, {resource: 'holiday', format:'xlsx'})}
                            className={DashboardModalStyles.download} target='_blank'>xlsx</Link>
                        {` or `}
                        <Link download href={fetchWrapper.getApiUrl(fileEndpoint, {resource: 'holiday', format:'csv'})}
                            className={DashboardModalStyles.download}>csv</Link>
                        {` template here`}
                    </p>
            </div>
        </DashboardModal>
    );
};

export default HolidayModal;