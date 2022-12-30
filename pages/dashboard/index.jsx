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
        console.log('running service');
        dashboardService.getData()
            .then(res => {
                if (res.error) {
                    console.log(res.messgae);
                } else {
                    setData(res);
                    console.log('data set');
                }
            });
    }, []);

    useEffect(() => {
        if (Object.keys(data).length > 0 && props.user.role) {
            try {
                console.log('setting tile info');
                setTileInfo(data.tilesInfo);
                console.log('tile info set');
            } catch (err) {
                console.log('tileInfo', err);
            }
            dashboardService.getInvoicesTrends(data.invoiceTrends)
                .then(res => {
                    console.log('setting invoice');
                    setLineGraphData(res)
                    console.log('invoice set');
                })
                .catch(err => console.log("invoice trends error: ", err));
            dashboardService.getEmployeeTrends(data.employeeTrends, props.user.role)
                .then(res => {
                    console.log('setting pie chart');
                    setPieGraphData(res)
                    console.log('pie chart set');
                })
                .catch(err => console.log("emp trends error: ", err));
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
                        <div style={{ position: 'relative', height: "100%", minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        <div style={{ position: 'relative', minHeight: '350px',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
