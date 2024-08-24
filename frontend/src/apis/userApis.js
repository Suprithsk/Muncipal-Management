import axiosInstance from "./axiosInstance";

export const getAllCities = async () => {
    try {
        const response = await axiosInstance.get('/user/getCities');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}
export const getAreasByCityId = async (city_id) => {
    try {
        const response = await axiosInstance.get(`/user/getAreasByCityId/${city_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const createProblem = async (title, description, city_id, area_id, user_id) => {
    try {
        const response = await axiosInstance.post('/user/createProblem', {title, description, city_id, area_id, user_id });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getAllProblemByUserId = async (user_id) => {
    try {
        const response = await axiosInstance.get(`/user/getProblemByUserId/${user_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const createTicketByProblemId = async (problem_id, obj) => {
    try {
        const response = await axiosInstance.post(`/user/raiseTicketByProblemId/${problem_id}/66642e8cc51925526ce0ecc2`, {problem_description:obj.problem_description} );
        return response.data;
    } catch (error) {
        console.error('err',error);
        throw error
    }
}