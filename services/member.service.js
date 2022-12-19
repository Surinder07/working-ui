import { fetchWrapper } from '../helpers';

const endpoints = process.env.endpoints.member;

const listAllUsers = async (pageNo, pageSize, filters, sort) => {
    console.log('endpoints', endpoints)
    return fetchWrapper.get(fetchWrapper.getPaginationUrl(endpoints.getAllMembers, pageNo, pageSize, filters));
}

export const memberService = {
    listAllUsers
}