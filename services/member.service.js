import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.member;

const listAllUsers = async (pageNo, pageSize, filters, sort) => {
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllMembers, pageNo, pageSize, filters));
}

const inviteSend = async (data) => {
     return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.sendInvite),{data})
}

const inviteResend = async (data) => {
    return fetchWrapper.post(fetchWrapper.getApiUrl(endpoints.resendInvite),{data})
}

const inviteByUpload = async (data) =>{
    return fetchWrapper.postForm(endpoints.sendInviteByUpload,data)
}

const memberById = async (id) => {
    return fetchWrapper.get(fetchWrapper.getApiUrl(endpoints.getMemberById),{id})
}

const updateOneMember = async (id,data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.updateMember),{id,data})
}

const employeePreference = async (id,data) => {
    return fetchWrapper.put(fetchWrapper.getApiUrl(endpoints.addEmployeePreferences),{id,data})
}

export const memberService = {
    listAllUsers,
    inviteSend,
    inviteResend,
    inviteByUpload,
    updateOneMember,
    memberById,
    employeePreference
}