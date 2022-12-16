import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.dropdown;

const stringToDropdownObj = (list) => {
    return list.map(str => {
        return { display: str, value: str }
    })
}

const getTimezones = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getTimezones))
        .then(res => {
            return stringToDropdownObj(res);
        });
}

export const dropdownService = {
    getTimezones,
    stringToDropdownObj
};