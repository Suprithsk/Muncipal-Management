import axiosInstance from './axiosInstance';

export const getAllCities = async () => {
    try {
        const response = await axiosInstance.get('/admin/getCities');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAreas = async (city_id) => {
    try {
        const response = await axiosInstance.get(`/admin/getAreas/${city_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createCity = async (name) => {
    try {
        const response = await axiosInstance.post('/admin/createCity', { name });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const createArea = async (name, city_id) => {
    try {
        const response = await axiosInstance.post('/admin/createArea', { name, city_id });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAllProblems = async () => {
    try {
        const response = await axiosInstance.get('/admin/getAllProblems');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const markProblemAsResolved = async (problem_id) => {
    try {
        const response = await axiosInstance.put(`/admin/markProblemAsResolved/${problem_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}