import { AmericaIcon, CanadaIcon } from '../public/images';
import { dropdownService } from '../services';

export const CountryCodes = [
    {
        country: 'CA',
        display: 'Canada(+1)',
        value: '+1',
        selectDisplay: '+1',
        icon: CanadaIcon
    },
    {
        country: 'US',
        display: 'America(+1)',
        value: '+1',
        selectDisplay: '+1',
        icon: AmericaIcon
    }
];

export const DaysOfWeek = dropdownService.stringToDropdownObj([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]);

export const DaysOfWeekShort = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

export const hours = Array.from(Array(24).keys())
    .map(str => {
        return { display: str.toString().padStart(2, '0'), value: str.toString().padStart(2, '0') }
    });

export const minutes = Array.from(Array(60).keys())
    .map(str => {
        return { display: str.toString().padStart(2, '0'), value: str.toString().padStart(2, '0') }
    });

export const currencies = dropdownService.stringToDropdownObj(['CAD', 'USD']);

export const PayrollFrequency = dropdownService.stringToDropdownObj([
    'Weekly',
    'Half Month',
    'Monthly'
])

export const ReportType = dropdownService.stringToDropdownObj([
    'Payroll',
    'Attendance',
    'Holidays'
], true);

export const employeeTypeValues = dropdownService.stringToDropdownObj([
    'Full Time',
    'Part Time'
]);

export const RequestTypeValues = [
    { display: 'Personal Information Update', value: 'INFORMATION_UPDATE' },
    { display: 'Timeoff', value: 'TIME_OFF' },
    { display: 'Overtime', value: 'OVERTIME' }
];

export const LeaveTypeValues = dropdownService.stringToDropdownObj([
    'Vacation',
    'Sick Leave'
]);

export const EmployeeStatus = dropdownService.stringToDropdownObj([
    'Active',
    'Invited',
    'Disabled'
]);

export const EmployeeType = [
    { display: 'Full Time', value: 'FULL_TIME' },
    { display: 'Contractor', value: 'CONTRACTOR' }
];

export const profileType = dropdownService.stringToDropdownObj([
    'Admin', 'Employee'
])

export const status = dropdownService.stringToDropdownObj([
    'Active', 'Disabled'
], true);

export const timesheetType = [
    { display: 'Clocked', value: 'CLOCKED' },
    { display: 'Manual', value: 'ADDED_BY_ADMIN' }
]

export const shiftStatusOptions = dropdownService.stringToDropdownObj([
    'Created', 'Assigned', 'Released', 'Conflict', 'Failed'
], true);

export const batchStatusOptions = dropdownService.stringToDropdownObj([
    'Created', 'Released', 'Failed'
], true);

export const requestStatus = dropdownService.stringToDropdownObj([
    'New', 'Open', 'Accepted', 'Denied'
], true);

export const notificationType = dropdownService.stringToDropdownObj([
    'Employee', 'Shift', 'Request', 'Location', 'Role', 'Payment', 'Report', 'Calendar', 'Account'
], true);

export const notificationStatus = dropdownService.stringToDropdownObj([
    'Read', 'Unread'
], true);