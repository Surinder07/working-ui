import Router from 'next/router';
import { fetchWrapper, secureLocalStorage } from '../helpers';

const endpoints = process.env.endpoints.user;

const TOKEN_KEY = 'WAAW_jwt_token';
const USER_KEY = 'WAAW_user';

const login = async (login, password, rememberMe, setToken, setUser) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.authorization),
        { login, password, rememberMe })
        .then(res => {
            if (res.error) {
                return res;
            }
            secureLocalStorage.saveData(TOKEN_KEY, res.token);
            setToken(res.token);
            return res;
        })
        .then((res) => {
            return res.error ? res : getUser().then(res => {
                secureLocalStorage.saveData(USER_KEY, JSON.stringify(res));
                setUser(res);
                return res;
            })
        });
}

const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    Router.push('/login');
}

const registerUser = async (email, password, contractor) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.registerNewUser),
        { email, password, contractor })
}

const emailVerification = async (key) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.verifyEmail, { key }))
}

const validateInviteKey = async (key) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.validateInviteKey, { key }))
}

const registerByInvitation = async (inviteKey, password) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.registerByInvite), { inviteKey, password })
}

const getUser = async () => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getUserDetails));
}

const requestResetPassword = async (email) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.resetPasswordInit, { email }));
}

const finishResetPassword = async (key, newPassword) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.resetPasswordFinish), { key, newPassword });
}

const completeProfile = async (data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.completeProfile), data);
}

const validatePromoCode = async (promoCode) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.validatePromoCode, { promoCode }));
}

const updateProfileImage = async (file) => {
    return fetchWrapper.postForm(fetchWrapper.getApiUrl(endpoints.updateProfileImage), { file });
}

const updateLoggedUserDetails = async (data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.updateUser), data);
}

const initEmailUpdate = async (email) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.updateEmailInit, {email}))
}

const finishEmailUpdate = async (token) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.updateEmailFinish, {token}))
}

export const userService = {
    login,
    registerUser,
    logout,
    getUser,
    requestResetPassword,
    finishResetPassword,
    completeProfile,
    TOKEN_KEY,
    USER_KEY,
    emailVerification,
    validateInviteKey,
    registerByInvitation,
    validatePromoCode,
    updateProfileImage,
    updateLoggedUserDetails,
    initEmailUpdate,
    finishEmailUpdate
};