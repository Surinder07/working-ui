import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.locationAndRole;

const saveLocation = (name, timezone) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.newLocation), {name, timezone});
}

const getAllLocations = (pageNo, pageSize) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getLocation, pageNo, pageSize));
}

const getAllRoles = (pageNo, pageSize) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getLocationRole, pageNo, pageSize));
}

export const locationAndRoleService = {
    saveLocation,
    getAllLocations,
    getAllRoles
}