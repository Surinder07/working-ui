import { CountryIcons } from '../public/images/icons/countryIcons';
import { dropdownService } from '../services';

export const CountryCodes = [
    {
        country: 'CA',
        display: 'Canada(+1)',
        value: '+1',
        selectDisplay: '+1',
        icon: CountryIcons.Canada
    },
    {
        country: 'US',
        display: 'America(+1)',
        value: '+1',
        selectDisplay: '+1',
        icon: CountryIcons.America
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
        return { display: str, value: str }
    });

export const minutes = Array.from(Array(60).keys())
    .map(str => {
        return { display: str, value: str }
    });

export const currencies = dropdownService.stringToDropdownObj(['CAD', 'USD']);

export const PayrollFrequency = dropdownService.stringToDropdownObj([
    'Weekly',
    'Half Month',
    'Monthly'
])