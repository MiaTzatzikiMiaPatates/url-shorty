import {getAllUrls} from "../api/methods/urlsApi.js";
import {getAllStats} from "../api/methods/statsApi.js";
import {createAnchorElement, createElement, formatLongUrl} from "../utils/helper.js";
import {BASE_URL} from "../api/endpoints.js";

const statsContainer = document.querySelector("#stats-container");

const urls = await getAllUrls();
const stats = await getAllStats();

const createStatsItems = () => {
    for (const [key, value] of Object.entries(urls)) {
        const shortUrlLink = BASE_URL + value.shortUrl;
        const oldUrlLink = value.longUrl;
        const oldUrlLinkText = formatLongUrl(value.longUrl);
        const clicks = stats.find((element) => element.urlId === value.id).clicks;

        const statsItem = createElement("div", "stats-item", null, null)
        const newUrlItem = createAnchorElement("new-url-item",null, shortUrlLink, shortUrlLink)
        statsItem.append(newUrlItem);

        const clickItems = createElement("div", "click-items", null, null);
        const oldUrlItem = createAnchorElement("old-url-item", null, oldUrlLinkText, oldUrlLink);
        const totalClicksItem = createElement("a", "clicks-item", null, `Total Clicks: ${clicks}`);

        clickItems.append(oldUrlItem);
        clickItems.append(totalClicksItem);

        statsItem.append(clickItems);
        statsContainer.append(statsItem);
    }
}

createStatsItems();