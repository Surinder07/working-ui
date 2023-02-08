import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.notification;

const getAll = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllNotification, pageNo, pageSize, { ...filters, ...sort }));
}

const markAsRead = async (id) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.markNotificationAsRead, { id }));
}

const markAllAsRead = async () => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.markAllNotificationAsRead));
}

const _delete = async (id) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteNotification, { id }));
}

export const notificationService = {
    getAll,
    markAsRead,
    markAllAsRead,
    delete: _delete
}