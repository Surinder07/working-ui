import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.dropdown;

const stringToDropdownObj = (list, capitalize) => {
    return list.map(str => {
        return { display: str, value: capitalize ? str.toUpperCase().replaceAll(" ", "_") : str }
    })
}

const getTimezones = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getTimezones))
        .then(res => {
            return stringToDropdownObj(res);
        });
}

const getLocations = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getLocations))
        .then(res => {
            return res.map(options => {
                return { display: options.name, value: options.id }
            })
        });
}

const getRoles = async (locationId) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getRoles, { locationId }))
        .then(res => {
            return res.map(options => {
                return { display: options.name, value: options.id }
            })
        });
}

const getUsers = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getUsers))
        .then(res => {
            return res.map(options => {
                return { display: options.name, value: options.id }
            })
        });
}

export const dropdownService = {
    getTimezones,
    stringToDropdownObj,
    getLocations,
    getRoles,
    getUsers
};