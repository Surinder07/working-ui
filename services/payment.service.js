import { fetchWrapper } from "../helpers";

const endpoints = process.env.endpoints.paymentApis;

const createSetupIntent = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.createSetupIntent));
};

const getAllCards = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getAllCards))
}

export const paymentService = {
    createSetupIntent,
    getAllCards
}