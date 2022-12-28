import { WaawNoIndexHead, MobileModal } from "../../components";

const PaymentHistoryModal = (props) => {
    const paymentHistoryData = {
        invoiceId: 259999,
        service: "Name of Location",
        startDate: "DD/MM/YYYY",
        endDate: "DD/MM/YYYY",
        billingDate: "DD/MM/YYYY",
        amount: "Amount",
        status: "Status",
    };

    return (
        <>
            <WaawNoIndexHead title="Payment History" />
            <MobileModal header="Payment History" data={paymentHistoryData}></MobileModal>
        </>
    );
};

export default PaymentHistoryModal;
