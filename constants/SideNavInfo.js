import {Dashboard, PeopleAlt, CalendarMonth, Schedule, Place, RequestPage, Receipt, Description} from '@mui/icons-material';

export const SideNavInfo = {
    admin: [
        {
            icon: <Dashboard style={{ fontSize: '16px' }} />,
            text: 'Dashboard',
            link: '',
            activeKey: 'DASHBOARD'
        },
        {
            icon: <CalendarMonth style={{ fontSize: '16px' }} />,
            text: 'Calender',
            link: '',
            activeKey: 'CALENDER'
        },
        {
            icon: <Schedule style={{ fontSize: '16px' }} />,
            text: 'Shifts',
            link: '',
            activeKey: 'SHIFTS'
        },
        {
            icon: <Place style={{ fontSize: '16px' }} />,
            text: 'Locations',
            link: '',
            activeKey: 'LOCATIONS'
        },
        {
            icon: <PeopleAlt style={{ fontSize: '16px' }} />,
            text: 'Employees',
            link: '',
            activeKey: 'EMPLOYEES'
        },
        {
            icon: <RequestPage style={{ fontSize: '16px' }} />,
            text: 'Requests',
            link: '',
            activeKey: 'REQUESTS'
        },
        {
            icon: <Receipt style={{ fontSize: '16px' }} />,
            text: 'Invoices',
            link: '',
            activeKey: 'INVOICES'
        },
        {
            icon: <Description style={{ fontSize: '16px' }} />,
            text: 'Reports',
            link: '',
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