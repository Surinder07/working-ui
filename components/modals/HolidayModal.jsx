import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { CloudUpload } from "@mui/icons-material";
import { fetchWrapper } from "../../helpers";
import Link from 'next/link';
import { useState } from "react";

const HolidayModal = (props) => {

    const fileEndpoint = process.env.endpoints.resources.fileTemplate;
    const [file, setFile] = useState({});
    const [loading, setLoading] = useState(false);
    const onCancel = () => {
      setFile({})
    }

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            handleUpload(e.target.files[0]);
            /**
            * @todo change image in user details
            */
        }
    }
    // const isError = () => {
    //     return file.length > 0;
    // }
    const handleUpload = async file => {
        console.log('data received', file);
        if (file.name) {
            fetchAndHandle(() => memberService.inviteByUpload({ file: file }), null, setLoading,
                props.setReloadData, props.setPageLoading, onCancel, props.setShowModal,
                props.setToasterInfo);
        }
        //  else if (!isError()) {
        //     fetchAndHandle(() => memberService.sendInvite(saveUserRequestBody(firstName, lastName, role,
        //         location, employeeId, email, toggleValue === 'Permanent')), 'Invite Sent Successfully',
        //         setLoading, props.setReloadData, props.setPageLoading, onCancel, props.setShowModal,
        //         props.setToasterInfo);
        // }
        // const formData = new FormData();
        // formData.append("image", image.raw);

        // await fetch("YOUR_URL", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        //     body: formData
        // });
    };


    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Upload Holiday"
            type="twoColWide"
            onClick={handleUpload}
            onCancel={onCancel}
            loading={loading}
        >
            <div className={`${DashboardModalStyles.singleColumn} ${DashboardModalStyles.uploadContainer}`}>
                <CloudUpload className={DashboardModalStyles.icon} />
                <label htmlFor="upload">Select file to Import</label>
                <input type="file" id="upload" style={{ display: "none" }}  onChange={handleFileChange}/>
                <p>
                        {`Download `}
                        <Link download href={fetchWrapper.getApiUrl(fileEndpoint, {resource: 'holiday', format:'xlsx'})}
                            className={DashboardModalStyles.download}>xlsx</Link>
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