import axios from "axios";
import { ServerUrl } from "./ServerUrl";

export const api = async (url, method, headers = {}, data = {}) => {
  try {

const token  = JSON.parse(localStorage.getItem("credentials"));
 const accessToken = token.token

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
    console.log(config);


    const response = await axios(config);

    return response.data;
  } catch (error) {
    const errorMessage =
    error.response?.data?.message;
    throw new Error(errorMessage);

  }

};
