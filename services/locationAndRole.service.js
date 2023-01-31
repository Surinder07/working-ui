import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.locationAndRole;

const saveLocation = async ({ name, timezone }) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.newLocation), { name, timezone });
}

const getAllLocations = async (pageNo, pageSize) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getLocation, pageNo, pageSize));
}

const removeLocation = async (id) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteLocation, { id }))
}

const toggleActiveLocation = async (id) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.toggleActiveLocation, { id }))
}

const getAllRoles = (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getLocationRole, pageNo, pageSize, { ...filters, ...sort }));
}

const getRoleById = (id) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getLocationRole, { id }))
}

const addNewLocationRole = async (data) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.newLocationRole), data)
}

const removeLocationRole = async (id) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteLocationRole, { id }))
}

const editLocationRole = async (data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.updateLocationRole), data)
}

const toggleActiveLocationRole = async (id) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.toggleActiveLocationRole, { id }))
}

export const locationAndRoleService = {
    saveLocation,
    getAllLocations,
    getAllRoles,
    getRoleById,
    removeLocation,
    toggleActiveLocation,
    addNewLocationRole,
    removeLocationRole,
    editLocationRole,
    toggleActiveLocationRole
}