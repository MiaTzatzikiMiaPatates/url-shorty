import { CLICKSTATS } from "../endpoints.js";
import * as requests from "../requests.js";
import {ClickStats} from "../../models/clickstats";

export const getAllStats = async (): Promise<ClickStats[]> => {
    return await requests.getRequest(`${CLICKSTATS}`)
}

// export const updateStats = async (id) => {
//     return await requests.putRequest(`${CLICKSTATS}/${id}`);
// }