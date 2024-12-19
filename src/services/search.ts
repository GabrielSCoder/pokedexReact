import { getRequest } from "./request";

export const getSearch = async (url : string) => {
    return await getRequest(url);
}
