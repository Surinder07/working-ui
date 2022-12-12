import { Dashboard, PeopleAlt, CalendarMonth, Schedule, Place, Badge, RequestPage, Receipt, Description, Notifications } from '@mui/icons-material';

export const SideNavInfo = {
    admin: [
        {
            icon: <Dashboard style={{ fontSize: '16px' }} />,
            text: 'Dashboard',
            link: '/dashboard',
            activeKey: 'DASHBOARD'
        },
        {
            icon: <CalendarMonth style={{ fontSize: '16px' }} />,
            text: 'Calendar',
            link: '/dashboard/calendar',
            activeKey: 'CALENDAR'
        },
        {
            icon: <Schedule style={{ fontSize: '16px' }} />,
            text: 'Shifts',
            link: '/dashboard/shifts',
            activeKey: 'SHIFTS'
        },
        {
            icon: <Place style={{ fontSize: '16px' }} />,
            text: 'Locations',
            link: '/dashboard/locations',
            activeKey: 'LOCATIONS'
        },
        {
            icon: <Badge style={{ fontSize: '16px' }} />,
            text: 'Roles',
            link: '/dashboard/roles',
            activeKey: 'ROLES'
        },
        {
            icon: <PeopleAlt style={{ fontSize: '16px' }} />,
            text: 'Employees',
            link: '/dashboard/employees',
            activeKey: 'EMPLOYEES'
        },
        {
            icon: <RequestPage style={{ fontSize: '16px' }} />,
            text: 'Requests',
            link: '/dashboard/requests',
            activeKey: 'REQUESTS'
        },
        {
            icon: <Receipt style={{ fontSize: '16px' }} />,
            text: 'Invoices',
            link: '/dashboard/invoices',
            activeKey: 'INVOICES'
        },
        {
            icon: <Notifications style={{ fontSize: '16px' }} />,
            text: 'Notifications',
            link: '/dashboard/notifications',
            activeKey: 'NOTIFICATIONS'
        },
        {
            icon: <Description style={{ fontSize: '16px' }} />,
            text: 'Reports',
            link: '/dashboard/reports',
            activeKey: 'REPORTS'
        }
    ],
    manager: [

    ],
    employee: [

    ],
    superAdmin: [

    ]
}