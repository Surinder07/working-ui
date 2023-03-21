import { fetchWrapper } from "../helpers";

const endpoints = process.env.endpoints.paymentApis;

const createSetupIntent = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.createSetupIntent));
};

const getAllCards = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getAllCards))
}

const createPaymentIntent = async (invoiceId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.createPaymentIntent, { invoiceId }));
}

const getAllInvoices = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllInvoices, pageNo, pageSize, { ...filters, ...sort }));
}

const getById = async (invoiceId) => {
    return fetchWrapper.get(fetchWrapper.getById(endpoints.confirmPayment, { invoiceId }))
}

const confirmPayment = async (invoiceId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.confirmPayment, { invoiceId }))
}

export const paymentService = {
    createSetupIntent,
    getAllCards,
    createPaymentIntent,
    getAllInvoices,
    getById,
    confirmPayment
}