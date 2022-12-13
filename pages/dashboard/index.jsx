import { useEffect } from 'react';
import { DashboardStyles } from '../../styles/pages';
import { InfoTileBanner, TabularInfo, DashboardCard, WaawNoIndexHead } from '../../components';
import { Pie, Line } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

const Dashboard = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "DASHBOARD",
            activeSubMenu: "none",
        });
    }, []);

    Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

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

    const invoice = {
        labels: [
            'test',
            'test',
            'test',
            'test',
            'test',
            'test',
        ],
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: [300, 600, 100, 900, 250, 500],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',    
                lineTension: 0.4,        
                radius: 6      
            }
        ]
    }

    const employees = {
        labels: [
            'Location1',
            'Location2',
            'Location3'
        ],
        datasets: [{
            label: 'Employee Trends',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        elements: {
            arc: {
                weight: 0.5,
                borderWidth: 3
            }
        },
        aspectRatio: 1,
        plugins: {
            title: {
                display: true,
                text: 'Employee Trends',
                position: 'top'
            }
        }
    }

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
            <DashboardCard style={{ marginTop: "20px", display: 'flex' }} >
                <div style={{ width: '60%' }}>
                    <Line data={invoice} />
                </div>
                <div style={{ width: '40%' }}>
                    <Pie data={employees} options={options} />
                </div>
            </DashboardCard>
        </>
    );
};

export default Dashboard;
