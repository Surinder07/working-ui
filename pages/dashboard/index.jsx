import { useEffect } from "react";
import WaawHead from "../../components/WaawHead";

const Dashboard = (props) => {

    useEffect(() => {
        props.setActiveMenu('dashboard');
    }, [])

    return (
        <>
            <WaawHead title={'WaaW | Dashboard'} />
            {
                Object.entries(props.user).map((userDetail, i) => (
                    <p key={i}>{userDetail[0]}: {userDetail[1]}</p>
                ))
            }
        </>
    )
}

export default Dashboard;