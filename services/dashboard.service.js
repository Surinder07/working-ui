import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.dashboard;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getData = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getData));
}

const setInvoicesTrends = async (data, setData) => {
    const currentYearData = data.currentYear ? months
        .filter(month => Object.keys(data.currentYear).includes(month))
        .map(month => {
            return data.currentYear[month]
        }) : [];
    const previousYearData = data.previousYear ? months
        .filter(month => Object.keys(data.previousYear).includes(month))
        .map(month => {
            return data.previousYear[month]
        }) : [];

    const response = {
        noData: currentYearData.length === 0 && previousYearData.length === 0,
        labels: months,
        datasets: [
            {
                fill: true,
                label: "Invoices (Current Year)",
                data: currentYearData,
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
                data: previousYearData,
                borderColor: "rgb(223, 224, 235)",
                backgroundColor: "rgba(223, 224, 235, 0.3)",
                lineTension: 0.4,
                radius: 6,
                pointRadius: 3,
                pointHoverRadius: 6,
            },
        ],
    };
    setData(response);
}

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

const setEmployeeTrends = async (data, role, setData) => {
    let empData = data;
    const response = {
        noData: (data.filter(emp => emp.employees !== 0).length) === 0,
        labels: empData.filter(emp => emp.employees !== 0)
            .map(emp => role === 'ADMIN' ? emp.location : emp.role),
        datasets: [
            {
                label: "Active Employees",
                data: empData.map(emp => emp.employees),
                backgroundColor: getBlueBgList(empData.length),
                hoverOffset: 4,
            },
        ]
    }
    setData(response);
}

export const dashboardService = {
    getData,
    setInvoicesTrends,
    setEmployeeTrends
}