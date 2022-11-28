import { useEffect } from "react";
import WaawHead from "../../components/WaawHead";
import Table from "../../components/Table";
import { EmployeesHeader } from "../../constants/EmployeesValues";
import { EmployeesValues } from "../../constants/EmployeesValues";
import Pagination from "../../components/Pagination";

const Employees = (props) => {
  useEffect(() => {
    props.setActiveMenu("hide");
  }, []);

  return (
    <>
      <WaawHead title={"WaaW | Employees"} />
      {Object.entries(props.user).map((userDetail, i) => (
        <p key={i}>
          {userDetail[0]}: {userDetail[1]}
        </p>
      ))}
      <div className="flex flex-col justify-between w-full h-full">
        <Table
          heading="Employees"
          subHeading="Tabular list Employee details."
          sort="true"
          filter="true"
          filterUrl="/icons/Filter.svg"
          sortUrl="/icons/Sort.svg"
          invoiceHeader={EmployeesHeader}
          invoiceData={EmployeesValues}
          pagination="true"
          dropdown="true"
        />
        <Pagination />
      </div>
    </>
  );
};

export default Employees;
