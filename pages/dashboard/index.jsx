import { useEffect, useState } from "react";
import { DashboardStyles } from "../../styles/pages";
import { InfoTileBanner, DashboardCard, WaawNoIndexHead, DashboardTabular } from "../../components";
import { pieConfig, areaConfig } from "../../constants";
import { Pie, Line } from "react-chartjs-2";
import { Chart, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle } from "chart.js";
Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle);
import { dashboardService } from "../../services";

const shifts = [
    {
        Id: "8977890",
        employeeName: "xyzabc",
        employeeEmail: "XYZABC@GMAIL.COM",
        locationName: "ABC",
        shiftStartTime: "HH:MM",
        shiftEndTime: "HH:MM",
    },
    {
        Id: "8977890",
        employeeName: "xyzabc",
        employeeEmail: "XYZABC@GMAIL.COM",
        locationName: "ABC",
        shiftStartTime: "HH:MM",
        shiftEndTime: "HH:MM",
    },
    {
        Id: "8977890",
        employeeName: "xyzabc",
        employeeEmail: "XYZABC@GMAIL.COM",
        locationName: "ABC",
        shiftStartTime: "HH:MM",
        shiftEndTime: "HH:MM",
    },
];

const Dashboard = (props) => {

    const [tileData, setTileData] = useState({});
    const [invoiceTrends, setInvoiceTrends] = useState({ noData: true });
    const [employeeTrends, setEmployeeTrends] = useState({ noData: true });

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "DASHBOARD",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN", "MANAGER", "EMPLOYEE"]);
    }, []);

    useEffect(() => {
        if (props.user.role) {
            dashboardService.getData()
                .then(res => {
                    if (res.error) {
                        console.log(res.message);
                    } else {
                        setTileData(res.tilesInfo);
                        dashboardService.setInvoicesTrends(res.invoiceTrends, setInvoiceTrends);
                        dashboardService.setEmployeeTrends(res.employeeTrends, props.user.role, setEmployeeTrends);
                    }
                })
        }
    }, [props.user])

    return (
        <>
            <WaawNoIndexHead title="Dashboard" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Overview and Analytics</h1>
            </div>
            <InfoTileBanner data={tileData} role={props.user.role} />
            <DashboardTabular role={props.user.role} />
            <DashboardCard
                className={DashboardStyles.graph}
                style={{
                    marginTop: "20px",
                    display: "grid",
                    gridTemplateColumns: "3fr 2fr",
                }}
            >
                {
                    invoiceTrends.labels ?
                        <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Line data={invoiceTrends} options={areaConfig("Payment History Trends", "Current Year ( 2022-2023 )")} />
                            {invoiceTrends.noData && <p style={{ position: 'absolute', top: '50%' }}>No Data to show</p>}
                        </div> :
                        <p>Loading...</p>
                }
                {
                    employeeTrends.labels ?
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Pie data={employeeTrends} options={pieConfig("Employee Trends", "Current Year ( 2022-2023 )", "Month", "Invoice Amount")} />
                            {employeeTrends.noData && <p style={{ position: 'absolute', top: '50%' }}>No Data to show</p>}
                        </div> :
                        <p>Loading...</p>
                }
            </DashboardCard>
        </>
    );
};

export default Dashboard;
