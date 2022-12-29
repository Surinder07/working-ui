import { useEffect, useState } from "react";
import { DashboardStyles } from "../../styles/pages";
import { InfoTileBanner, TabularInfo, DashboardCard, WaawNoIndexHead } from "../../components";
import { pieConfig, areaConfig } from "../../constants";
import { Pie, Line } from "react-chartjs-2";
import { Chart, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle } from "chart.js";
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

    const [tabularData, setTabularData] = useState({});
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
                        setTabularData({
                            title: props.user.role === "ADMIN" ? "Payment History" : "Schedule shift for today",
                            description: props.user.role === "ADMIN" ? "Tabular list of payment history." : "Tabular list of all shifts assigned for today",
                            data: props.user.role === "ADMIN" ? dashboardService.getInvoices(res.invoices) : shifts,
                            showFilter: props.user.role !== 'ADMIN',
                            showSearch: props.user.role !== 'ADMIN'
                        })
                        setInvoiceTrends(res.invoiceTrends ? dashboardService.getInvoicesTrends(res.invoiceTrends) : {});
                        setEmployeeTrends(dashboardService.getEmployeeTrends(res.employeeTrends, props.user.role === 'ADMIN'));
                    }
                })
        }
    }, [props.user])

    Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle);

    return (
        <>
            <WaawNoIndexHead title="Dashboard" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Overview and Analytics</h1>
            </div>
            <InfoTileBanner data={tileData} role={props.user.role} />
            <DashboardCard style={{ marginTop: "20px" }}>
                <TabularInfo
                    title={tabularData.title}
                    description={tabularData.description}
                    data={tabularData.data}
                    showFilter={tabularData.showFilter}
                    showSearch={tabularData.showSearch} />
            </DashboardCard>
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
