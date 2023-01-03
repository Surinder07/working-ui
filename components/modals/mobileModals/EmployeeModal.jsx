import {WaawNoIndexHead, MobileModal} from "../../../components";

const EmployeeModal = (props) => {
    const employeeData = {
        employeeId: 259999,
        employeeName: "Name of Employee",
        email: "abcdefghijk@gmail.com",
        contactDetail: "95621475861",
        role: "Role Name",
        location: "Location",
        status: "Status",
    };

    return (
        <>
            <WaawNoIndexHead title="Employees" />
            <MobileModal header="Employees" data={employeeData}></MobileModal>
        </>
    );
};

export default EmployeeModal;
