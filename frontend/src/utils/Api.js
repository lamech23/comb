import axios from "axios";
import { ServerUrl } from "../utils/ServerUrl";
import { getAccessTokenFromCookie } from "./AccesToken";

const refreshToken = async () => {

};

export const api = async (url, method, headers = {}, data = {}) => {
    try {

        const accessToken = getAccessTokenFromCookie();

        const requestHeaders = {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            ...headers,
        };

        const config = {
            method,
            url: ServerUrl + url,
            data,
            headers: requestHeaders,
        };
        const response = await axios(config);
        // console.log(config);

        if (response.data && response.data.tokenExpired) {
            const refreshedToken = await refreshToken();

            const refreshedHeaders = {
                ...requestHeaders,
                Authorization: `Bearer ${refreshedToken}`,
            };

            const refreshedConfig = {
                ...config,
                headers: refreshedHeaders,
            };

            const refreshedResponse = await axios(refreshedConfig);
            return refreshedResponse.data;
        }

        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.message;
        throw new Error(errorMessage);

    }
};