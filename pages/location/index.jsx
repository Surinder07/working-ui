import { useEffect } from "react";
import WaawHead from "../../components/WaawHead";
import Table from "../../components/Table";
import { LocationSheetHeader } from "../../constants/LocationValues";
import { LocationSheetValues } from "../../constants/LocationValues";
import Pagination from "../../components/Pagination";

const Location = (props) => {
  useEffect(() => {
    props.setActiveMenu("hide");
  }, []);

  return (
    <>
      <WaawHead title={"WaaW | Location"} />
      {Object.entries(props.user).map((userDetail, i) => (
        <p key={i}>
          {userDetail[0]}: {userDetail[1]}
        </p>
      ))}
      <div className="flex flex-col justify-between w-full h-full">
        <Table
          heading="Location  sheet"
          subHeading="Tabular list locationwise employees."
          sort="true"
          filter="true"
          filterUrl="/icons/Filter.svg"
          sortUrl="/icons/Sort.svg"
          invoiceHeader={LocationSheetHeader}
          invoiceData={LocationSheetValues}
          center="true"
          pagination="true"
          dropdown="true"
        />
        <Pagination />
      </div>
    </>
  );
};

export default Location;
