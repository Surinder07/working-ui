import { WaawNoIndexHead, MobileModal } from "../../../components";

const RequestModal = (props) => {
    const requestData = {
        requestId: 259999,
        requestType: "Name of Request",
        initiationDate: "DD/MM/YYYY",
        initiatedBy: "Name",
        assignedTo: "Name",
        location: "Location",
        status: "Status",
    };

    return (
        <>
            <WaawNoIndexHead title="Requests" />
            <MobileModal header="Requests" data={requestData}></MobileModal>
        </>
    );
};

export default RequestModal;
