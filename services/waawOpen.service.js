import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.openApis;

const subscribeToWaaw = async (email) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.subscribe, { email }));
}

export const waawOpenService = {
    subscribeToWaaw
}