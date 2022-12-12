import { CountryIcons } from '../public/icons/countryIcons/CountryIcons';

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

export const DaysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

export const DaysOfWeekShort = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];

export const hours = Array.from(Array(24).keys());

export const minutes = Array.from(Array(60).keys());