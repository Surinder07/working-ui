import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.shifts;

const newShift = async (data) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.createShift), data);
}

export const shiftsService = {
    newShift
}