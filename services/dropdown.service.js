import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.dropdown;

const getTimezones = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getTimezones));
}

export const dropdownService = {
    getTimezones
};