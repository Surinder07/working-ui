import {WaawNoIndexHead, MobileModal} from "../../../components";

const RoleModal = (props) => {
    const roleData = {
        roleId: 259999,
        Name: "Name of Role",
        profileType: "Profile",
        creationDate: "DD/MM/YYYY",
        location: "Location name",
        createdBy: "Name",
    };

    return (
        <>
            <WaawNoIndexHead title="Roles" />
            <MobileModal header="Roles" data={roleData}></MobileModal>
        </>
    );
};

export default RoleModal;
