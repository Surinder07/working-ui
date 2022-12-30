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

    const [data, setdata] = useState({});

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "DASHBOARD",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN", "MANAGER", "EMPLOYEE"]);
        dashboardService.getData()
            .then(res => setdata(res));
    }, []);

    return (
        <>
            <WaawNoIndexHead title="Dashboard" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Overview and Analytics</h1>
            </div>
            <InfoTileBanner data={data.tilesInfo} role={props.user.role} />
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
                    data.invoiceTrends ?
                        <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Line
                                data={dashboardService.getInvoicesTrends(data.invoiceTrends)}
                                options={areaConfig("Payment History Trends", "Current Year ( 2022-2023 )")} />
                            {
                                dashboardService.getInvoicesTrends(data.invoiceTrends).noData &&
                                <p style={{ position: 'absolute', top: '50%' }}>No Data to show</p>
                            }
                        </div> :
                        <p>Loading...</p>
                }
                {
                    data.employeeTrends ?
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Pie
                                data={dashboardService.getEmployeeTrends(data.employeeTrends, props.user.role)}
                                options={pieConfig("Employee Trends", "Current Year ( 2022-2023 )", "Month", "Invoice Amount")} />
                            {
                                dashboardService.getEmployeeTrends(data.employeeTrends, props.user.role).noData &&
                                <p style={{ position: 'absolute', top: '50%' }}>No Data to show</p>
                            }
                        </div> :
                        <p>Loading...</p>
                }
            </DashboardCard>
        </>
    );
};

export default Dashboard;
