const request = async (url, method, data = null) => {
    try {
        const options = {
            method: method,
            headers: {},
        };

        if (data !== null) {
            options.headers = {"Content-Type": "application/json"};
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            return response
        }

        // const json = await response.json();
        // return {response:true, status:response.status, data: json};

        if (response.headers.get("Content-Type")) {
            return response.json();
        } else {
            return response;
        }
    } catch (error) {
        console.error(error)
    }
}

export const getRequest = async (url) => {
    return await request(url, "GET")
}

export const postRequest = async (url, data) => {
    return await request(url, "POST", data);
}

export const putRequest = async (url, data) => {
    return await request(url, "PUT", data);
}

export const deleteRequest = async (url) => {
    return await request(url, "DELETE");
}