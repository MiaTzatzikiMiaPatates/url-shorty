import * as groupsRequests from "../api/methods/groupsApi.js";
import * as urlsRequests from "../api/methods/urlsApi.js";
import * as helpers from "../utils/helper.js";
import {BASE_URL} from "../api/endpoints.js";
import {Url} from "../models/url";

const urlInput = document.querySelector("#url-input") as HTMLInputElement;
const customUrlInput = document.querySelector("#custom-irl-input") as HTMLInputElement;
const groupsSelector = document.querySelector("#groupsSelector") as HTMLInputElement;
const newUrlShowcaseContent = document.querySelector("#newUrlShowcaseContent") as HTMLElement;
const newUrlShowcase = document.querySelector("#newUrlShowcase") as HTMLElement;
const shortUrlForm = document.querySelector("#short-url-form") as HTMLElement;

const groups = await groupsRequests.getAllGroups();


helpers.createSelectOptions(groups, groupsSelector);

shortUrlForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const isUrlValid = validateField(urlInput);
    const isGroupSelectorValid = validateField(groupsSelector);

    if (isUrlValid && isGroupSelectorValid) {
        const data: Url = {
            longUrl: urlInput.value,
            shortUrl: customUrlInput.value,
            groupId: Number(groupsSelector.value)
        };

        const response = await urlsRequests.addUrl(data);

        if (response.status === 409 || response.status === 414) {
            helpers.toggleFieldError(customUrlInput);
        } else {
            helpers.toggleDefaultField(customUrlInput);
            showNewUrl(`${BASE_URL}${response.shortUrl}`);
        }
    }
});


const validateField = (field: HTMLInputElement): boolean => {
    if (isFieldEmpty(field)) {
        helpers.toggleFieldError(field);
        return false;
    } else {
        helpers.toggleDefaultField(field);
        return true;
    }
}

const isFieldEmpty = (field: HTMLInputElement): boolean => {
    return field.value.trim() === "";
}

const showNewUrl = (value: string) => {
    newUrlShowcase.style.display = "flex";
    newUrlShowcaseContent.innerText = value;
    newUrlShowcaseContent.setAttribute("href", value);
}
