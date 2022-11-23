import getConfig from 'next/config';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.apiUrl;
const endpoints = process.env.endpoints.dropdown;

const getApiUrl = (endpoint) => {
    return `${baseUrl}${endpoint}`
}

const getTimezones = async () => {
    return fetchWrapper.get(getApiUrl(endpoints.getTimezones));
}

export const dropdownService = {
    getTimezones
};