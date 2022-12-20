import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.locationAndRole;

const saveLocation = (name, timezone) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.newLocation), {name, timezone});
}

const getAllLocations = (pageNo, pageSize) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getLocation, pageNo, pageSize));
}

const removeLocation = async (location) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteLocation),{location})
}

const toggleLocation = async (location) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.toggleActiveLocation),{location})
}

const getAllRoles = (pageNo, pageSize) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getLocationRole, pageNo, pageSize));
}

const addNewLocationRole = async (data) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.newLocationRole),{data})
}

const removeLocationRole = async (data) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteLocationRole),{data})
}

const editLocationRole = async (data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.updateLocationRole),{data})
}

const toggleLocationRole = async (data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.toggleActiveLocationRole),{data})
}

export const locationAndRoleService = {
    saveLocation,
    getAllLocations,
    getAllRoles,
    removeLocation,
    toggleLocation,
    addNewLocationRole,
    removeLocationRole,
    editLocationRole,
    toggleLocationRole
}