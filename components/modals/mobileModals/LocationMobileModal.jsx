import {WaawNoIndexHead, MobileModal} from "../../../components";

const LocationMobileModal = (props) => {
    const locationData = {
        locationId: 259999,
        locationName: "Name of Location",
        creationDate: "DD/MM/YYYY",
        timezon: "EST",
        noOfAcitveEmployees: "1000",
        noOfInactiveEmployees: "50",
        status: "Status",
    };

    return (
        <>
            <WaawNoIndexHead title="Locations" />
            <MobileModal header="Locations" data={locationData}></MobileModal>
        </>
    );
};

export default LocationMobileModal;
