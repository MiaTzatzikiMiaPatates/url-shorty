import {RequestMethods} from "./request-methods.js"
import {RequestOptions} from "./request-options";

const request = async (url: string, method: RequestMethods, data = null): Promise<any> => {
    try {
        const options: RequestOptions = {method: method};

        if (data !== null) {
            options.headers = {"Content-Type": "application/json"};
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);

        if (response.headers.get("Content-Type")?.includes("application/json") && response.ok) {
            return response.json();
        } else {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export const getRequest = async (url: string) => {
    return await request(url, RequestMethods.GET)
}

export const postRequest = async (url: string, data: any): Promise<any> => {
    return await request(url, RequestMethods.POST, data);
}

export const putRequest = async (url: string, data: any): Promise<any> => {
    return await request(url, RequestMethods.PUT, data);
}

export const deleteRequest = async (url: string): Promise<any> => {
    return await request(url, RequestMethods.DELETE);
}