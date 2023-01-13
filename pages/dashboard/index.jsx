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

    const [tileInfo, setTileInfo] = useState();
    const [lineGraphData, setLineGraphData] = useState();
    const [pieGraphData, setPieGraphData] = useState();

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "DASHBOARD",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN", "MANAGER", "EMPLOYEE"]);
    }, []);

    useEffect(() => {
        if (props.user.role) {
            dashboardService.getData(props.user.role)
                .then(res => {
                    try {
                        setTileInfo(res.tilesInfo);
                    } catch (err) {
                        console.log('tileInfo error: "', err);
                    }
                    try {
                        setLineGraphData(res.lineGraph);
                    } catch (err) {
                        console.log('invoice trends error: "', err);
                    }
                    try {
                        setPieGraphData(res.pieGraph);
                    } catch (err) {
                        console.log('employee trends error: "', err);
                    }
                });
        }
    }, [props.user])

    const getLineGraphTitle = () => {
        if (props.user.role === 'ADMIN') {
            return {
                title: 'Payment History Trends',
                description: 'Current Year',
                x: 'Month',
                y: 'Invoice Amount'
            }
        } else if (props.user.role === 'MANAGER') {
            return {
                title: 'Total Hours Worked By Employees',
                description: 'Current Week',
                x: 'Day of Week',
                y: 'Total Hours Worked'
            }
        } else {
            return {
                title: 'Total Hours Worked',
                description: 'Current Week',
                x: 'Day of Week',
                y: 'Total Hours Worked'
            }
        }
    }

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
                                options={areaConfig(getLineGraphTitle().title, getLineGraphTitle().description, getLineGraphTitle().x, getLineGraphTitle().y)} />
                            {
                                lineGraphData.noData &&
                                <p style={{ position: 'absolute', top: '50%' }}>No Data to show</p>
                            }
                        </div> :
                        <p>Loading...</p>
                }
                {
                    pieGraphData ?
                        (
                            pieGraphData === 'noData' ?
                                <></> :
                                <div style={{ position: 'relative', minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Pie
                                        data={pieGraphData}
                                        options={pieConfig("Employee Trends", "Current Year ( 2022-2023 )", "Month", "Invoice Amount")} />
                                    {
                                        pieGraphData.noData &&
                                        <p style={{ position: 'absolute', top: '50%' }}>No Data to show</p>
                                    }
                                </div>
                        ) :
                        <p>Loading...</p>

                }
            </DashboardCard>
        </>
    );
};

export default Dashboard;
