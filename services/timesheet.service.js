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

const getAll = async (pageNo, pageSize, filters) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAll, pageNo, pageSize, { ...filters }))
}

export const timesheetService = {
    startTimer,
    stopTimer,
    getActiveTimer,
    getAll
}