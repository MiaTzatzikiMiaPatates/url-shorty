import * as groupsRequests from "../api/methods/groupsApi.js";
import * as urlsRequests from "../api/methods/urlsApi.js";
import * as helpers from "../utils/helper.js";
import {BASE_URL} from "../api/endpoints.js";

const urlInput = document.querySelector("#url-input");
const customUrlInput = document.querySelector("#custom-irl-input");
const groupsSelector = document.querySelector("#groupsSelector");
const newUrlShowcaseContent = document.querySelector("#newUrlShowcaseContent");
const newUrlShowcase = document.querySelector("#newUrlShowcase");
const shortUrlForm = document.querySelector("#short-url-form");

const groups = await groupsRequests.getAllGroups();


helpers.createSelectOptions(groups, groupsSelector);

shortUrlForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const isUrlValid = validateField(urlInput);
    const isGroupSelectorValid = validateField(groupsSelector);

    if (isUrlValid && isGroupSelectorValid) {
        const data = {
            longUrl: urlInput.value,
            shortUrl: customUrlInput.value,
            groupId: groupsSelector.value
        }
        const response = await urlsRequests.addUrl(data);
        if (response.status === 409 || response.status === 414) {
            helpers.toggleFieldError(customUrlInput);
        } else {
            helpers.toggleDefaultField(customUrlInput);
            showNewUrl(`${BASE_URL}${response.shortUrl}`);
        }
    }
});


const validateField = (field) => {
    if (isFieldEmpty(field)) {
        helpers.toggleFieldError(field);
        return false;
    } else {
        helpers.toggleDefaultField(field);
        return true;
    }
}


const isFieldEmpty = (field) => {
    return field.value.trim() === "";
}


const showNewUrl = (value) => {
    newUrlShowcase.style.display = "flex";
    newUrlShowcaseContent.innerText = value;
    newUrlShowcaseContent.setAttribute("href", value);
}
