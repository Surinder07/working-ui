import { Holiday, ActiveEmployees, ActiveLocation, PendingRequests, Roles, Shifts, Time } from '../public/images';

export const DashboardTileMap = {
    admin: ['holidayCurrentWeek', 'activeEmployees', 'activeLocations', 'pendingRequests'],
    manager: ['holidayCurrentWeek', 'activeEmployees', 'onlineEmployees', 'pendingRequests'],
    employee: ['holidayCurrentWeek', 'hoursWorkedByWeek', 'nextShift', 'pendingRequests'],
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
        title: 'Emloyees Online',
        icon: ActiveEmployees,
        href: '/dashboard/shifts'
    },
    hoursWorkedByWeek: {
        title: 'Hours Worked',
        timeframe: 'Current Week',
        icon: Time,
        href: '/dashboard/time-clock'
    },
    nextShift: {
        title: 'Upcomin Shift',
        icon: Shifts,
        href: '/dashboard/shifts'
    }
};