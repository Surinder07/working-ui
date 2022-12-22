import { useEffect, useState } from "react";
import { DashboardStyles } from "../../styles/pages";
import { InfoTileBanner, TabularInfo, DashboardCard, WaawNoIndexHead } from "../../components";
import { pieConfig, areaConfig } from "../../constants";
import { Pie, Line } from "react-chartjs-2";
import { Chart, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle } from "chart.js";

const invoices = [
    {
        invoiceId: "6476475",
        service: "One time register",
        startDate: "-",
        endDate: "-",
        billingDate: "01/29/2022",
        amount: "$960",
        status: "Paid",
    },
    {
        invoiceId: "6476475",
        service: "Monthly Fees",
        startDate: "01/01/2022",
        endDate: "02/01/2022",
        billingDate: "01/29/2022",
        amount: "$200",
        status: "Paid",
    },
    {
        invoiceId: "6476475",
        service: "Monthly Fees",
        startDate: "02/01/2022",
        endDate: "03/01/2022",
        billingDate: "02/29/2022",
        amount: "$250",
        status: "Due",
    },
];

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

const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const invoice = {
    labels: months,
    datasets: [
        {
            fill: true,
            label: "Invoices (Current Year)",
            data: [300, 600, 100, 900, 250, 500],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.1)",
            lineTension: 0.4,
            radius: 6,
            pointRadius: 3,
            pointHoverRadius: 6,
        },
        {
            fill: true,
            label: "Invoices (Previous Year)",
            data: [310, 620, 80, 700, 350, 200, 400, 343, 200, 100, 400],
            borderColor: "rgb(223, 224, 235)",
            backgroundColor: "rgba(223, 224, 235, 0.3)",
            lineTension: 0.4,
            radius: 6,
            pointRadius: 3,
            pointHoverRadius: 6,
        },
    ],
};

const employeeData = [
    {
        location: "Starbucks",
        employees: 31,
    },
    {
        location: "Baristas",
        employees: 20,
    },
    {
        location: "Mr Crabs",
        employees: 52,
    },
    {
        location: "Chai Point",
        employees: 8,
    },
];

const Dashboard = (props) => {

    const [tabularData, setTabularData] = useState({})

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "DASHBOARD",
            activeSubMenu: "none",
        });
    }, []);

    useEffect(() => {
        if (props.user.role) {
            setTabularData({
                title: props.user.role === "ADMIN" ? "Payment History" : "Schedule shift for today",
                description: props.user.role === "ADMIN" ? "Tabular list of payment history." : "Tabular list of all shifts assigned for today",
                data: props.user.role === "ADMIN" ? invoices : shifts,
                showFilter: props.user.role !== 'ADMIN',
                showSearch: props.user.role !== 'ADMIN'
            })
        }
    }, [props.user])

    Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle);

    const getBlueBgList = (length) => {
        var result = [],
            left = 0.1,
            right = 1,
            delta = (right - left) / (length - 1);
        while (left < right) {
            result.push(left);
            left += delta;
        }
        result.push(right);
        return result.map((alpha) => `rgba(41, 150, 195, ${alpha})`);
    };

    const employees = {
        labels: employeeData.map((emp) => emp.location),
        datasets: [
            {
                label: "Total Employees",
                data: employeeData.map((emp) => emp.employees),
                backgroundColor: getBlueBgList(employeeData.length),
                hoverOffset: 4,
            },
        ],
    };

    return (
        <>
            <WaawNoIndexHead title="Dashboard" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Overview and Analytics</h1>
            </div>
            <InfoTileBanner />
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
                <div style={{height: "100%"}}>
                    <Line data={invoice} options={areaConfig("Payment History Trends", "Current Year ( 2022-2023 )")} />
                </div>
                <div style={{display:'flex', justifyContent:'end'}}>
                    <Pie data={employees} options={pieConfig("Employee Trends", "Current Year ( 2022-2023 )", "Month", "Invoice Amount")} />
                </div>
            </DashboardCard>
        </>
    );
};

export default Dashboard;
