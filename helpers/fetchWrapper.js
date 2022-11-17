import { userService } from '../services/user.service';
import { secureLocalStorage } from './secureLocalStorage';

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
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
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

const authHeader = (url) => {
    let token = secureLocalStorage.getData(userService.TOKEN_KEY);
    const isAuthUrl = !url.includes('unAuth');
    if (token != null && isAuthUrl) {
        return { Authorization: `Bearer ${secureLocalStorage.getData(userService.TOKEN_KEY)}` };
    } else {
        return {};
    }
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            console.log(text)
            /** 
             * @todo: Add custom error code check
             **/
            // if ([401, 403].includes(response.status) && userService.userValue) {
            //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            //     userService.logout();
            // }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        }

        return data;
    });
}

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};