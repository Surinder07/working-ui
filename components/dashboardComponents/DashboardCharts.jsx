// import { pieConfig, areaConfig } from "../../constants";
// import { Pie, Line } from "react-chartjs-2";
// import { Chart, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle } from "chart.js";

// const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// const invoice = {
//     labels: months,
//     datasets: [
//         {
//             fill: true,
//             label: "Invoices (Current Year)",
//             data: [300, 600, 100, 900, 250, 500],
//             borderColor: "rgb(53, 162, 235)",
//             backgroundColor: "rgba(53, 162, 235, 0.1)",
//             lineTension: 0.4,
//             radius: 6,
//             pointRadius: 3,
//             pointHoverRadius: 6,
//         },
//         {
//             fill: true,
//             label: "Invoices (Previous Year)",
//             data: [310, 620, 80, 700, 350, 200, 400, 343, 200, 100, 400],
//             borderColor: "rgb(223, 224, 235)",
//             backgroundColor: "rgba(223, 224, 235, 0.3)",
//             lineTension: 0.4,
//             radius: 6,
//             pointRadius: 3,
//             pointHoverRadius: 6,
//         },
//     ],
// };

// const employeeData = [
//     {
//         location: "Starbucks",
//         employees: 31,
//     },
//     {
//         location: "Baristas",
//         employees: 20,
//     },
//     {
//         location: "Mr Crabs",
//         employees: 52,
//     },
//     {
//         location: "Chai Point",
//         employees: 8,
//     },
// ];

// const DashboardCharts = (props) => {

//     Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Title, SubTitle);

//     const getBlueBgList = (length) => {
//         var result = [],
//             left = 0.1,
//             right = 1,
//             delta = (right - left) / (length - 1);
//         while (left < right) {
//             result.push(left);
//             left += delta;
//         }
//         result.push(right);
//         return result.map((alpha) => `rgba(41, 150, 195, ${alpha})`);
//     };

//     const employees = {
//         labels: employeeData.map((emp) => emp.location),
//         datasets: [
//             {
//                 label: "Total Employees",
//                 data: employeeData.map((emp) => emp.employees),
//                 backgroundColor: getBlueBgList(employeeData.length),
//                 hoverOffset: 4,
//             },
//         ],
//     };

//     return (
//         props.type === 'line' ?
//             <Line data={invoice} options={areaConfig("Payment History Trends", "Current Year ( 2022-2023 )")} /> :
//             <Pie data={employees} options={pieConfig("Employee Trends", "Current Year ( 2022-2023 )", "Month", "Invoice Amount")} />
//     )
// }

// export default DashboardCharts;