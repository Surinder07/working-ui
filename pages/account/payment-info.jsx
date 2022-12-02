import { useEffect } from "react";
import WaawHead from "../../components/WaawHead";

const Payment = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'fullPage',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
    }, []);

    return (
        <>
            <WaawHead title={`WaaW`} />

        </>
    );
};

export default Payment;
