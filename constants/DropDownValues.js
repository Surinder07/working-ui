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
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
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
]);

export const employeeTypeValues = dropdownService.stringToDropdownObj([
    'Full Time',
    'Part Time'
]);

export const RequestTypeValues = dropdownService.stringToDropdownObj([
    'Personal Information Update',
    'Timeoff',
    'Overtime'
])

export const LeaveTypeValues = dropdownService.stringToDropdownObj([
    'Vacation',
    'Sick Leave'
])