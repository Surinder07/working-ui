import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.locationAndRole;

const saveLocation = (name, timezone) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.new), {name, timezone});
}

const getAllLocations = (pageNo, pageSize) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.get, pageNo, pageSize));
}

export const locationAndRoleService = {
    saveLocation,
    getAllLocations
}