import { useEffect } from "react";
import WaawHead from "../../components/WaawHead";
import CardContainer from "../../components/CardContainer";
import { DashboardCardValues } from "../../constants/DashboardValues";
import Table from "../../components/Table";
import { DashboardInvoicesHeader } from "../../constants/DashboardValues";
import { DashboardInvoicesValues } from "../../constants/DashboardValues";

const Dashboard = (props) => {
  useEffect(() => {
    props.setActiveMenu("hide");
  }, []);

  return (
    <>
      <WaawHead title={"WaaW | Dashboard"} />
      {Object.entries(props.user).map((userDetail, i) => (
        <p key={i}>
          {userDetail[0]}: {userDetail[1]}
        </p>
      ))}
      <div className="flex justify-between w-full h-full">
        {DashboardCardValues.map((values, index) => (
          <CardContainer key={index} heading={values.heading} subHeading={values.subHeading} banner={values.banner} url={values.url} />
        ))}
      </div>
      <div className="flex justify-between w-full h-full">
        <Table heading="Invoices" subHeading="Tabular list of the current invoice status." invoiceHeader={DashboardInvoicesHeader} invoiceData={DashboardInvoicesValues} button="true" />
      </div>
    </>
  );
};

export default Dashboard;
