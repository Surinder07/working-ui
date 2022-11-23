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

const login = async (login, password, rememberMe, setToken, setUser) => {
    return fetchWrapper.post(getApiUrl(endpoints.authorization),
        { login, password, rememberMe })
        .then(res => {
            if (res.error) {
                return res;
            }
            secureLocalStorage.saveData(TOKEN_KEY, res.token);
            setToken(res.token);
        })
        .then((res) => {
            return res.error ? res : getUser().then(res => {
                secureLocalStorage.saveData(USER_KEY, JSON.stringify(res));
                setUser(res);
                return res;
            })
        }
        );
}

const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    Router.push('/');
}

const registerUser = async (email, password, contractor) => {
    return fetchWrapper.post(getApiUrl(endpoints.registerNewUser),
        { email, password, contractor })
}

const getUser = async () => {
    return fetchWrapper.get(getApiUrl(endpoints.getUserDetails));
}

export const userService = {
    login,
    registerUser,
    logout,
    getUser,
    TOKEN_KEY,
    USER_KEY
};