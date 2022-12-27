import {useEffect, useState} from "react";
import {DashboardStyles} from "../../styles/pages";
import {WaawNoIndexHead, EditableInput, MobileModal} from "../../components";

const PaymentHistory = (props) => {
    const [startDate, setStartDate] = useState("");
    const [initialStartDate, setInitialStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [initialEndDate, setInitialEndDate] = useState("");
    const [billingDate, setBillingDate] = useState("");
    const [initialBillingDate, setInitialBillingDate] = useState("");

    const [editOn, setEditOn] = useState(true);

    return (
        <>
            <WaawNoIndexHead title="Payment History" />
            <MobileModal header="RolPayment Historyes" edit delete setEditOn={setEditOn}>
                <EditableInput type="text" editOn={editOn} label="Invoice ID" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Service" className={DashboardStyles.colspan2} />
                <EditableInput type="date" label="Start date" value={startDate} className={DashboardStyles.colspan2} setValue={setStartDate} initialValue={initialStartDate} editOn={editOn} />
                <EditableInput type="date" label="End Date" value={endDate} className={DashboardStyles.colspan2} setValue={setEndDate} initialValue={initialEndDate} editOn={editOn} />
                <EditableInput type="date" label="Billing Date" value={billingDate} className={DashboardStyles.colspan2} setValue={setBillingDate} initialValue={initialBillingDate} editOn={editOn} />
                <EditableInput type="text" editOn={editOn} label="Location" className={DashboardStyles.colspan2} />
                <EditableInput type="text" editOn={editOn} label="Status" className={DashboardStyles.colspan2} />
            </MobileModal>
        </>
    );
};

export default PaymentHistory;
