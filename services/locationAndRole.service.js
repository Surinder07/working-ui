import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.locationAndRole;

const saveLocation = (name, timezone) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.new), {name, timezone});
}

const getAllLocations = () => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.get));
}

export const locationAndRoleService = {
    saveLocation,
    getAllLocations
}