import instance from "./axios";

export const getRequest = async (url: string) => {

    const axios = await instance();

    try {
        const response = await axios.get(url);
        return response;
    } catch (error: any) {
        return error;
    }
};