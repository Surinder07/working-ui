import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.calender;

const getHolidays = (year) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getHolidays, {year}));
}

const getTimesheets = (year, month) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getTimesheet, {month, year}));
}

const getEvents = (date) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getDayEvents, {date}));
}

export const calendarService = {
    getHolidays,
    getTimesheets,
    getEvents
}