import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.timesheet;

const startTimer = async () => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.startTimer));
}

const stopTimer = async () => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.stopTimer));
}

const getActiveTimer = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getTimer));
}

export const timesheetService = {
    startTimer,
    stopTimer,
    getActiveTimer
}