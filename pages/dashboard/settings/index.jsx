import { useEffect } from "react";
import { ComingSoonEl } from "../../../components";

const Settings = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "ROLES",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(['ADMIN', 'MANAGER', 'EMPLOYEE']);
    }, []);

    return (
        <div style={{ height: '80vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ComingSoonEl dashboard />
        </div>
    )
}

export default Settings;