import Router from 'next/router';
import { userService } from '../services/user.service';
import { secureLocalStorage } from './secureLocalStorage';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.apiUrl;

const getApiUrl = (endpoint, queryMap) => {
    const queries = [];
    if (queryMap) {
        Object.entries(queryMap).map(query => (
            queries.push(query[0] + '=' + query[1])
        ));
    }
    return `${baseUrl}${endpoint}${queries.length > 0 ? `?${queries.join('&')}` : ''}`;
}

const getPaginationUrl = (endpoint, pageNo, pageSize, queryMap) => {
    const updatedEndpoint = `${endpoint}/${pageNo - 1}/${pageSize}`;
    return getApiUrl(updatedEndpoint, queryMap);
}

const get = async (url) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const post = async (url, body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return await fetch(url, requestOptions).then(response => handleResponse(response));
}

const put = async (url, body) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete = async (url) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const postForm = async (url, data) => {
    const formData = new FormData();
    Object.entries(data).map(form => {
        formData.append(form[0], form[1]);
    })
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data", ...authHeader(url)
        },
        body: FormData
    }
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const authHeader = (url) => {
    let token = secureLocalStorage.getData(userService.TOKEN_KEY);
    const isAuthUrl = !url.includes('unAuth');
    if (token != null && isAuthUrl) {
        return { Authorization: `Bearer ${secureLocalStorage.getData(userService.TOKEN_KEY)}` };
    } else {
        return {};
    }
}

const handleResponse = async (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) userService.logout();
            else if (response.status === 403 && data) {
                console.log(data.waawErrorCode);
                switch (data.waawErrorCode) {
                    case 'WE_001':
                        Router.push('/account/complete-profile');
                        break;
                    case 'WE_002':
                        Router.push('/account/payment-info');
                        break;
                    default:
                        userService.logout();
                }
                return {};
            }
            const error = Math.floor(response.status / 100) === 5 ? 'Something went wrong. Please try again later' :
                (data && data.message) || response.statusText;
            return {
                error: true,
                message: error
            }
        }
        return data;
    },
        (error) => {
            return {
                error: true,
                message: error.message
            }
        });
}

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
    postForm,
    getApiUrl,
    getPaginationUrl
};