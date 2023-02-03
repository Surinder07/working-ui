import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { CloudUpload } from "@mui/icons-material";
import { fetchAndHandle, fetchWrapper } from "../../helpers";
import Link from 'next/link';
import { useState } from "react";
import { organizationService } from "../../services/organization.service";

const HolidayModal = (props) => {

    const fileEndpoint = process.env.endpoints.resources.fileTemplate;
    const [file, setFile] = useState({});
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setFile({})
    }

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            setFile(e.target.files[0]);
        }
    }

    const saveData = () => {
        if (file.name) {
            fetchAndHandle(() => organizationService.uploadHolidays({ file: file }), null, setLoading,
                null, props.setPageLoading, onCancel, props.setShowModal, props.setToasterInfo);
        } else {
            props.setToasterInfo({
                error: true,
                title: "Error!",
                message: 'Please select a file first'
            })
        }
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Upload"
            title="Upload Holiday"
            type="twoColWide"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <div className={`${DashboardModalStyles.singleColumn} ${DashboardModalStyles.uploadContainer}`}>
                <CloudUpload className={DashboardModalStyles.icon} />
                <label htmlFor="upload">Select file to Import</label>
                <input type="file" id="upload" style={{ display: "none" }} onChange={handleFileChange} />
                <p>
                    {`Download `}
                    <Link download href={fetchWrapper.getApiUrl(fileEndpoint, { resource: 'holiday', format: 'xlsx' })}
                        className={DashboardModalStyles.download}>xlsx</Link>
                    {` or `}
                    <Link download href={fetchWrapper.getApiUrl(fileEndpoint, { resource: 'holiday', format: 'csv' })}
                        className={DashboardModalStyles.download}>csv</Link>
                    {` template here`}
                </p>
            </div>
        </DashboardModal>
    );
};

export default HolidayModal;