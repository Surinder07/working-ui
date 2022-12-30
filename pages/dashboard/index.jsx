import { useEffect, useState } from "react";
import { DashboardStyles } from "../../styles/pages";
import { InfoTileBanner, DashboardCard, WaawNoIndexHead, DashboardTabular } from "../../components";
import { pieConfig, areaConfig } from "../../constants";
import { Pie, Line } from "react-chartjs-2";
import { Chart, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle } from "chart.js";
import { dashboardService } from "../../services";
Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle);

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

    const [data, setData] = useState({});
    const [tileInfo, setTileInfo] = useState();
    const [lineGraphData, setLineGraphData] = useState();
    const [pieGraphData, setPieGraphData] = useState();

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "DASHBOARD",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN", "MANAGER", "EMPLOYEE"]);
        dashboardService.getData()
            .then(res => {
                if (res.error) {
                    console.log(res.messgae);
                } else {
                    try {
                        setData(res);
                        setTileInfo(res.tilesInfo);
                    } catch (err) {
                        console.log('1st effect', err);
                    }
                }
            });
    }, []);

    useEffect(() => {
        try {
            if (Object.keys(data).length > 0 && props.user.role) {
                setLineGraphData(dashboardService.getInvoicesTrends(data.invoiceTrends));
                setPieGraphData(dashboardService.getEmployeeTrends(data.employeeTrends, props.user.role));
            }
        } catch (err) {
            console.log('2nd effect', err);
        }
    }, [data])

    return (
        <>
            <WaawNoIndexHead title="Dashboard" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Overview and Analytics</h1>
            </div>
            <InfoTileBanner data={tileInfo} role={props.user.role} />
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
                    lineGraphData ?
                        <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Line
                                data={lineGraphData}
                                options={areaConfig("Payment History Trends", "Current Year ( 2022-2023 )")} />
                            {
                                dashboardService.getInvoicesTrends(data.invoiceTrends).noData &&
                                <p style={{ position: 'absolute', top: '50%' }}>No Data to show</p>
                            }
                        </div> :
                        <p>Loading...</p>
                }
                {
                    pieGraphData ?
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Pie
                                data={pieGraphData}
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
