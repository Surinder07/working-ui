import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.shifts;

const newShift = async (data) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.createShift), data);
}

const getAll = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllShifts, pageNo, pageSize, {...filters, ...sort}));
}

const getByUser = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllShiftsUser, pageNo, pageSize, {...filters, ...sort}));
}

export const shiftsService = {
    newShift,
    getAll,
    getByUser
}