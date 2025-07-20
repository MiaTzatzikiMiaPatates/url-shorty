import {getAllUrls} from "../api/methods/urlsApi.js";
import {getAllStats} from "../api/methods/statsApi.js";
import {createAnchorElement, createElement, formatLongUrl} from "../utils/helper.js";
import {BASE_URL} from "../api/endpoints.js";
import {Url} from "../models/url";
import {ClickStats} from "../models/clickstats";

const statsContainer = document.querySelector("#stats-container") as HTMLElement;

const urls: Url[] = await getAllUrls();
const stats: ClickStats[] = await getAllStats();

const createStatsItems = () => {
    for (const [key, value] of Object.entries(urls)) {
        const shortUrlLink = BASE_URL + value.shortUrl;
        const oldUrlLink = value.longUrl;
        const oldUrlLinkText = formatLongUrl(value.longUrl);
        const clicks = stats.find((element) => element.urlId === value.id)!.clicks;

        const statsItem = createElement("div", "stats-item", undefined, undefined)
        const newUrlItem = createAnchorElement(shortUrlLink, "new-url-item",undefined, shortUrlLink) as HTMLElement
        statsItem.append(newUrlItem);

        const clickItems = createElement("div", "click-items", undefined, undefined);
        const oldUrlItem = createAnchorElement(oldUrlLink, "old-url-item", undefined, oldUrlLinkText) as HTMLElement;
        const totalClicksItem = createElement("a", "clicks-item", undefined, `Total Clicks: ${clicks}`);

        clickItems.append(oldUrlItem);
        clickItems.append(totalClicksItem);

        statsItem.append(clickItems);
        statsContainer.append(statsItem);
    }
}

createStatsItems();