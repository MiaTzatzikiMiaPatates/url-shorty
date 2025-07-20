import { CLICKSTATS } from "../endpoints.js";
import * as requests from "../requests.js";

export const getAllStats = async () => {
    return await requests.getRequest(`${CLICKSTATS}`)
}

// export const updateStats = async (id) => {
//     return await requests.putRequest(`${CLICKSTATS}/${id}`);
// }