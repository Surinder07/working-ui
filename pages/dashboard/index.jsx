import { useEffect } from 'react';
import { DashboardStyles } from '../../styles/pages';
import { InfoTileBanner, TabularInfo, DashboardCard, WaawNoIndexHead } from '../../components';
import { pieConfig, areaConfig } from '../../constants';
import { Pie, Line } from 'react-chartjs-2';
import {
    Chart,
    ArcElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Title,
    SubTitle,
} from 'chart.js';

const Dashboard = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "DASHBOARD",
            activeSubMenu: "none",
        });
    }, []);

    Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle);

    const getBlueBgList = (length) => {
        var result = [], left = 0.1, right = 1, delta = (right - left) / (length - 1);
        while (left < right) {
            result.push(left);
            left += delta;
        }
        result.push(right);
        return result.map(alpha => `rgba(41, 150, 195, ${alpha})`);
    }

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

    const months = ['Jan', 'Feb', "Mar", 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const invoice = {
        labels: months,
        datasets: [
            {
                fill: true,
                label: 'Invoices (Current Year)',
                data: [300, 600, 100, 900, 250, 500],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.1)',
                lineTension: 0.4,
                radius: 6
            },
            {
                fill: true,
                label: 'Invoices (Previous Year)',
                data: [310, 620, 80, 700, 350, 200, 400, 343, 200, 100, 400],
                borderColor: 'rgb(223, 224, 235)',
                backgroundColor: 'rgba(223, 224, 235, 0.3)',
                lineTension: 0.4,
                radius: 6
            }
        ]
    }

    const employeeData = [
        {
            location: 'Starbucks',
            employees: 31
        },
        {
            location: 'Baristas',
            employees: 20
        },
        {
            location: 'Mr Crabs',
            employees: 52
        },
        {
            location: 'Chai Point',
            employees: 8
        }
    ]

    const employees = {
        labels: employeeData.map(emp => emp.location),
        datasets: [{
            label: 'Total Employees',
            data: employeeData.map(emp => emp.employees),
            backgroundColor: getBlueBgList(employeeData.length),
            hoverOffset: 4
        }]
    };

    return (
        <>
            <WaawNoIndexHead title='Dashboard' />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Overview and Analytics</h1>
            </div>
            <InfoTileBanner />
            <DashboardCard style={{ marginTop: "20px" }} >
                {/* //   showOptions> */}
                <TabularInfo title="Invoices" description="Tabular list of all WAAW invoices with status." data={invoices} />
            </DashboardCard>
            <DashboardCard style={{
                marginTop: "20px",
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                // columnGap: '20px'
            }} >
                <div style={{height: '100%'}}>
                    <Line data={invoice} options={areaConfig('Invoice Trends', 'Current Year ( 2022-2023 )')} />
                </div>
                <div style={{}}>
                    <Pie data={employees} options={pieConfig('Employee Trends', 'Current Year ( 2022-2023 )', 'Month', 'Invoice Amount')} />
                </div>
            </DashboardCard>
        </>
    );
};

export default Dashboard;
