import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.shifts;

const newShift = async (data) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.createShift), data);
}

const getAll = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllShifts, pageNo, pageSize, { ...filters, ...sort }));
}

const getByUser = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllShiftsUser, pageNo, pageSize, { ...filters, ...sort }));
}

const deleteBatch = async (batchId) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteBatch, { batchId }))
}

const deleteShift = async (shiftId) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteShift, { shiftId }))
}

const releaseBatch = async (batchId) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.releaseBatch, { batchId }))
}

const releaseShift = async (shiftId) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.releaseShift, { shiftId }))
}

export const shiftsService = {
    newShift,
    getAll,
    getByUser,
    deleteBatch,
    deleteShift,
    releaseBatch,
    releaseShift
}