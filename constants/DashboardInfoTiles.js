import { Holiday, ActiveEmployees, ActiveLocation, PendingRequests } from '../public/images';

export const AdminTileMap = {
    admin: ['holidayCurrentWeek', 'activeEmployees', 'activeLocations', 'pendingRequests'],
}

export const DashboardInfoTiles = {
    holidayCurrentWeek: {
        title: 'Company Holidays',
        timeframe: 'Current Week',
        icon: Holiday,
        href: '/dashboard/calendar'
    },
    activeEmployees: {
        title: 'Acitve Employees',
        timeframe: 'Current Week',
        icon: ActiveEmployees,
        href: '/dashboard/employees'
    },
    activeLocations: {
        title: 'Active Locations',
        timeframe: 'Current Week',
        icon: ActiveLocation,
        href: '/dashboard/locations'
    },
    pendingRequests: {
        title: 'Pending Requests',
        icon: PendingRequests,
        href: '/dashboard/requests'
    },
    onlineEmployees: {
        title: 'Pending Requests',
        icon: PendingRequests,
        href: '/dashboard/requests'
    },
    hoursThisWeek: {
        title: 'Pending Requests',
        icon: PendingRequests,
        href: '/dashboard/requests'
    },
    hoursWorkedByWeek: {
        title: 'Pending Requests',
        icon: PendingRequests,
        href: '/dashboard/requests'
    },
    nextShift: {
        title: 'Pending Requests',
        icon: PendingRequests,
        href: '/dashboard/requests'
    }
};