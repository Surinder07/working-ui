import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { CloudUpload } from "@mui/icons-material";
import { fetchWrapper } from "../../helpers";
import Link from 'next/link';

const HolidayModal = (props) => {

    const fileEndpoint = process.env.endpoints.resources.fileTemplate;

    
    const handleFileChange = (e) => {
        if (e.target.files.length) {
            handleUpload(e.target.files[0]);
            /**
            * @todo change image in user details
            */
        }
    }

    const handleUpload = async file => {
        console.log('data received', file);
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
        >
            <div className={`${DashboardModalStyles.singleColumn} ${DashboardModalStyles.uploadContainer}`}>
                <CloudUpload className={DashboardModalStyles.icon} />
                <label htmlFor="upload">Select file to Import</label>
                <input type="file" id="upload" style={{ display: "none" }}  onChange={handleFileChange}/>
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