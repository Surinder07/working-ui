import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.requests;

const addNew = async (data) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.newRequest), data);
}

const getAll = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAll, pageNo, pageSize, {...filters, ...sort}));
}

const getAllForUser = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getMyRequests, pageNo, pageSize, {...filters, ...sort}));
}

const update = async (data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.updateRequest), data);
}

export const requestService = {
    addNew,
    getAll,
    getAllForUser,
    update
}