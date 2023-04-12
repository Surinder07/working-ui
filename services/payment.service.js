import { fetchWrapper } from "../helpers";

const endpoints = process.env.endpoints.paymentApis;

const createSetupIntent = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.createSetupIntent));
};

const getAllCards = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getAllCards))
}

const addNewCard = async (tokenId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.addNewCard, { tokenId }))
}

const deleteCard = async (cardId) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteCard, { cardId }))
}

const updateDefaultCard = async (cardId) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.updateDefaultCard, { cardId }))
}

const createPaymentIntent = async (invoiceId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.createPaymentIntent, { invoiceId }));
}

const getAllInvoices = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllInvoices, pageNo, pageSize, { ...filters, ...sort }));
}

const getById = async (invoiceId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getById, { invoiceId }))
}

const confirmPayment = async (invoiceId, stripeId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.confirmPayment, { invoiceId, stripeId }))
}

const getPendingInvoice = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getPendingInvoice));
}

export const paymentService = {
    createSetupIntent,
    getAllCards,
    addNewCard,
    deleteCard,
    updateDefaultCard,
    createPaymentIntent,
    getAllInvoices,
    getById,
    confirmPayment,
    getPendingInvoice
}