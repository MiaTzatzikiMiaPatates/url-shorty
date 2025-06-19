import * as groupsRequests from "../api/groupsApi.js";
import * as urlsRequests from "../api/urlsApi.js";
import * as helpers from "../utils/helper.js";


const urlInput = document.querySelector("#url-input");
const customUrlInput = document.querySelector("#custom-irl-input");
const groupsSelector = document.querySelector("#groupsSelector");
const urlSubmitButton = document.querySelector("#urlSubmitButton");
const newUrlShowcaseContent = document.querySelector("#newUrlShowcaseContent");
const newUrlShowcase = document.querySelector("#newUrlShowcase");

const groups = await groupsRequests.getAllGroups();


helpers.createSelectOptions(groups);

urlSubmitButton.addEventListener("click", async (event) => {
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

        if (response.status === 409) {
            helpers.toggleFieldError(customUrlInput);
        } else {
            helpers.toggleDefaultField(customUrlInput);
            showNewUrl(customUrlInput.value);
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
}
