import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CreditCardElement, WaawNoIndexHead } from "../../../components";
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
        paymentService.getPendingPayment()
            .then(res => {
                if (res.error) {
                    router.push('/dashboard');
                } else {
                    setDescription(res.transactionType === 'PLATFORM_FEE' ?
                        `Platform fee x ${res.unitPrice}` : `Active Employees(${res.quantity} x ${res.currency} ${res.unitPrice})`);
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
            <CreditCardElement
                type='payment'
                invoiceId={invoiceId}
                invoice={invoice}
                description={description}
                total={total}
                setPageLoading={props.setPageLoading}
                setToasterInfo={props.setToasterInfo}
                setUser={props.setUser}
                setToken={props.setToken}
                modal={{ show: true }}
            />
        </>
    )
}

export default MakePayment;