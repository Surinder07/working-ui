import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.member;

const listAllUsers = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllMembers, pageNo, pageSize, {...filters, ...sort}));
}

const sendInvite = async (data) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.sendInvite), data);
}

const resendInvite = async (id) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.resendInvite, { userId: id }));
}

const inviteByUpload = async (data) => {
    return fetchWrapper.postForm(fetchWrapper.getApiUrl(endpoints.sendInviteByUpload), data);
}

const getMemberById = async (id) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getMemberById), { id });
}

const updateMember = async (data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.updateMember), { data });
}

const deleteMember = async (id) => {
    return fetchWrapper.delete(fetchWrapper.getApiUrl(endpoints.deleteMember, { id }));
}

const toggleActiveMember = async (id) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.toggleActiveMember, { id }));
}

const addEmployeePreferences = async (id, data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.addEmployeePreferences), { id, data });
}

export const memberService = {
    listAllUsers,
    getMemberById,
    sendInvite,
    resendInvite,
    inviteByUpload,
    updateMember,
    deleteMember,
    toggleActiveMember,
    addEmployeePreferences
}