import { DashboardIcons } from '../public/icons/dashboardIcon/DashboardIcons';

export const DashboardInfoTiles = [
    {
        name: 'holiday',
        title: 'Company Holidays',
        timeframe: 'Current Week',
        icon: DashboardIcons.Holiday,
        href: '/dashboard/calendar'
    },
    {
        name: 'employee',
        title: 'Acitve Employees',
        timeframe: 'Current Week',
        icon: DashboardIcons.ActiveEmployees,
        href: '/dashboard/employees'
    },
    {
        name: 'location',
        title: 'Active Locations',
        timeframe: 'Current Week',
        icon: DashboardIcons.ActiveLocation,
        href: '/dashboard/locations'
    },
    {
        name: 'requests',
        title: 'Pending Requests',
        icon: DashboardIcons.PendingRequests,
        href: '/dashboard/requests'
    },
];