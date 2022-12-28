import { WaawNoIndexHead, MobileModal } from "../../../components";

const ShiftsModal = (props) => {
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
            <MobileModal header="Shifts" data={shiftData}></MobileModal>
        </>
    );
};

export default ShiftsModal;
