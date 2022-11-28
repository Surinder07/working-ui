import { useEffect } from "react";
import WaawHead from "../../components/WaawHead";

const Dashboard = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'dashboard',
            activeMenu: 'DASHBOARD',
            activeSubMenu: 'none'
        })
    }, []);

    return (
        <>
            <WaawHead title={"WaaW | Dashboard"} />
            <div style={{ padding: '0 30px', minHeight: '200vh' }}>
                <h1 style={{
                    fontWeight: 700,
                    fontSize: '28px',
                    lineHeight: '35px',
                    letterSpacing: '0.3px',
                    color: '#252733',
                    margin: '25px 0'
                }}>Overview and Analytics</h1>
            </div>
        </>
    );
};

export default Dashboard;
