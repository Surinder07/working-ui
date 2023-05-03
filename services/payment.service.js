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

const createPaymentIntent = async (paymentId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.createPaymentIntent, { paymentId }));
}

const getAllPayments = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllPayments, pageNo, pageSize, { ...filters, ...sort }));
}

const getById = async (paymentId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getPaymentById, { paymentId }))
}

const confirmPayment = async (paymentId, success) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.confirmPayment, { paymentId, success }))
}

const getPendingPayment = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getPendingPayment));
}

export const paymentService = {
    createSetupIntent,
    getAllCards,
    addNewCard,
    deleteCard,
    updateDefaultCard,
    createPaymentIntent,
    getAllPayments,
    getById,
    confirmPayment,
    getPendingPayment
}