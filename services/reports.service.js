import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.reports;

const generate = async (startDate, endDate, reportType, locationId) => {
    fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.generate), { startDate, endDate, reportType, locationId });
}

const getAll = async (pageNo, pageSize, filters) => {
    fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.get, pageNo, pageSize, { ...filters }));
}

const download = async (reportId) => {
    fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.download, { reportId }))
}

export const reportsService ={
    generate,
    getAll,
    download
}