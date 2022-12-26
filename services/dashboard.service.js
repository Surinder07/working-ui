import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.dashboard;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const getData = () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getData))
}

const getInvoicesTrends = (data) => {
    const currentYearData = months
        .filter(month => Object.keys(data.currentYear).includes(month))
        .map(month => {
            return data.currentYear[month]
        })
    const previousYearData = months
        .filter(month => Object.keys(data.previousYear).includes(month))
        .map(month => {
            return data.previousYear[month]
        })

    return {
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

const getEmployeeTrends = (data, isAdmin) => {
    let empData = data;
    return {
        noData: data.filter(emp => emp.employees !== 0).length === 0,
        labels: empData.filter(emp => emp.employees !== 0)
            .map(emp => isAdmin ? emp.location : emp.role),
        datasets: [
            {
                label: "Active Employees",
                data: empData.map(emp => emp.employees),
                backgroundColor: getBlueBgList(empData.length),
                hoverOffset: 4,
            },
        ]
    }
}

const getInvoices = (invoices) => {
    return invoices.data;
}

export const dashboardService = {
    getData,
    getInvoicesTrends,
    getEmployeeTrends,
    getInvoices
}