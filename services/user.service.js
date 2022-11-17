import getConfig from 'next/config';
import Router from 'next/router';
import { fetchWrapper, secureLocalStorage } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.apiUrl;
const endpoints = process.env.endpoints.user;

const TOKEN_KEY = 'WAAW_jwt_token';
const USER_KEY = 'WAAW_user';
const getApiUrl = (endpoint) => {
    return `${baseUrl}${endpoint}`
}

const login = async (login, password, rememberMe) => {
    return fetchWrapper.post(getApiUrl(endpoints.authorization),
        { login, password, rememberMe })
        .then(res => {
            secureLocalStorage.saveData(TOKEN_KEY, res.token);
        })
        .then(() => getUser()
            .then(res => {
                secureLocalStorage.saveData(USER_KEY, JSON.stringify(res));
                return res;
            })
        );
}

const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    Router.push('/');
}

const registerUser = async (email, password, contractor) => {
    fetchWrapper.post(getApiUrl(endpoints.registerNewUser),
        { email, password, contractor })
        .then(res => {
            if (!res.ok) {
                /**
                 * @todo add responses
                 */
            } else {
                Router.push('/email-validation')
            }
        })
}

const getUser = async () => {
    return fetchWrapper.get(getApiUrl(endpoints.getUserDetails));
}

export const userService = {
    login,
    logout,
    getUser,
    updateUserDetails,
    TOKEN_KEY,
    USER_KEY
};