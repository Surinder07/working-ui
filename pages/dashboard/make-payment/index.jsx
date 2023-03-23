import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PaymentOptions, WaawNoIndexHead } from "../../../components";
import { paymentService } from "../../../services";

const MakePayment = (props) => {

    const router = useRouter();

    const [invoice, setInvoice] = useState('-');
    const [invoiceId, setInvoiceId] = useState('');
    const [description, setDescription] = useState('- x -');
    const [total, setTotal] = useState('0 CAD');

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: 'loggedOut',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
        props.setPageLoading(true);
        paymentService.getPendingInvoice()
            .then(res => {
                if (res.error) {
                    router.push('/dashboard');
                } else {
                    setDescription(res.transactionType === 'PLATFORM_FEE' ?
                        `Platform fee x ${res.unitPrice}` : `Active Employees(${res.quantity} x ${res.unitPrice})`);
                    setTotal(`${res.totalAmount} ${res.currency}`)
                    setInvoiceId(res.id);
                    setInvoice(res.waawId);
                }
                props.setPageLoading(false);
            })
    }, [])

    return (
        <>
            <WaawNoIndexHead title="Payments" />
            <PaymentOptions
                invoice={invoice}
                description={description}
                total={total}
                hideSavedCards
                modal={{ show: true, invoiceId: invoiceId }}
                setPageLoading={props.setPageLoading}
                setToasterInfo={props.setToasterInfo}
                setToken={props.setToken}
                setUser={props.setUser}
            />
        </>
    )
}

export default MakePayment;