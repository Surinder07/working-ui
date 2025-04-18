import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.organization;

const uploadHolidays = async (file) => {
    return fetchWrapper.postForm(fetchWrapper.getApiUrl(endpoints.addHolidaysExcel), file);
}

const getHolidays = async (year) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getHolidays, { year }))
}

const updatePreferences = async (data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.updateOrganizationPreferences), data);
}

const uploadLogo = async (file) => {
    return fetchWrapper.postForm(fetchWrapper.getApiUrl(endpoints.uploadLogo), { file })
}

export const organizationService = {
    uploadHolidays,
    getHolidays,
    updatePreferences,
    uploadLogo
}