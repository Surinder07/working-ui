import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.dashboard;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const getData = async (role) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getData))
        .then(res => {
            let data = res;
            if (role === 'ADMIN') {
                data = {
                    ...data,
                    lineGraph: getInvoicesTrends(res.invoiceTrends),
                    pieGraph: getEmployeeTrends(res.employeeTrends, role)
                }
            } else if (role === 'MANAGER') {
                data = {
                    ...data,
                    lineGraph: getHoursTrends(res.hoursThisWeek, res.weekStart),
                    pieGraph: getEmployeeTrends(res.employeeTrends, role)
                }
            } else {
                data = {
                    ...data,
                    lineGraph: getHoursTrends(res.hoursThisWeek, res.weekStart),
                    pieGraph: 'noData'
                }
            }
            return data;
        });
}

const getInvoicesTrends = (data) => {
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

    return {
        noData: (currentYearData.length === 0 && previousYearData.length === 0),
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

const getHoursTrends = (data, weekStart) => {
    const currentWeekData = data.currentWeek ? days
        .filter(day => Object.keys(data.currentWeek).includes(day))
        .map(day => {
            return data.currentYear[day]
        }) : [];
    const lastWeekData = data.lastWeek ? days
        .filter(day => Object.keys(data.lastWeek).includes(day))
        .map(day => {
            return data.lastWeek[day]
        }) : [];
    return {
        noData: (currentWeekData.length === 0 && lastWeekData.length === 0),
        labels: startArrayFromMidElelment(weekStart, days),
        datasets: [
            {
                fill: true,
                label: "Toatl Hours (Current Week)",
                data: currentWeekData,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.1)",
                lineTension: 0.4,
                radius: 6,
                pointRadius: 3,
                pointHoverRadius: 6,
            },
            {
                fill: true,
                label: "Toatl Hours (Previous Week)",
                data: lastWeekData,
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

const getEmployeeTrends = (data, role) => {
    return {
        noData: (data.filter(emp => emp.employees !== 0).length) === 0,
        labels: data.filter(emp => emp.employees !== 0)
            .map(emp => {
                return role === 'ADMIN' ? emp.location : emp.role
            }),
        datasets: [
            {
                label: "Active Employees",
                data: data.map(emp => emp.employees),
                backgroundColor: getBlueBgList(data.length),
                hoverOffset: 4,
            },
        ]
    }
}

const startArrayFromMidElelment = (el, array) => {
    let tempArray = array;
    const arrayPart1 = tempArray.slice(tempArray.indexOf(el), tempArray.length);
    const arrayPart2 = tempArray.slice(0, tempArray.indexOf(el));
    return [...arrayPart1, ...arrayPart2];
}

export const dashboardService = {
    getData
}