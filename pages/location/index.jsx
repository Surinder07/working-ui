import { useEffect } from "react";
import WaawHead from "../../components/WaawHead";
import Invoices from "../../components/Invoices";
import { LocationSheetHeader } from "../../constants/LocationValues";
import { LocationSheetValues } from "../../constants/LocationValues";

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
      <div className="flex justify-between w-full h-full">
        <Invoices
          heading="Location  sheet"
          subHeading="Tabular list locationwise employees."
          sort="true"
          filter="true"
          filterUrl="/icons/Filter.svg"
          sortUrl="/icons/Sort.svg"
          invoiceHeader={LocationSheetHeader}
          invoiceData={LocationSheetValues}
          center="true"
        />
      </div>
    </>
  );
};

export default Location;
