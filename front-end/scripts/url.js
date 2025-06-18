import * as groupsRequests from "../api/groupsApi.js";
import * as urlsRequests from "../api/urlsApi.js";
import {createSelectOptions} from "../utils/helper.js";


const urlInput = document.querySelector("#url-input");
const customUrlInput = document.querySelector("#custom-irl-input");
const groupsSelector = document.querySelector("#groupsSelector");
const urlSubmitButton = document.querySelector("#urlSubmitButton");
const newUrlShowcaseContent = document.querySelector("#newUrlShowcaseContent");

const groups = await groupsRequests.getAllGroups();

const borderError = "2px solid red";
const backgroundColorError = "#ffe6e6";



createSelectOptions(groups);


urlSubmitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // invalidField(urlInput);
    // invalidField(groupsSelector);

    if (!invalidField(urlInput) && !invalidField(groupsSelector)) {
        const data = {
            longUrl: urlInput.value,
            shortUrl: customUrlInput.value,
            groupId: groupsSelector.value
        }

        const response = await urlsRequests.addUrl(data);

        if (!response.ok) {
            invalidField(customUrlInput);
        } else {
            newUrlShowcaseContent.innerText = customUrlInput.value;
        }
    }

    // if (urlInput.value === "") {
    //     invalidField(urlInput);
    // } else if (groupsSelector.value === "") {
    //     invalidField(groupsSelector);
    // } else {
    //     const data = {
    //         longUrl: urlInput.value,
    //         shortUrl: customUrlInput.value,
    //         groupId: groupsSelector.value
    //     }
    //
    //     const response = await urlsRequests.addUrl(data);
    //
    //     if (!response.ok) {
    //         invalidField(customUrlInput);
    //     } else {
    //         newUrlShowcaseContent.innerText = customUrlInput.value;
    //     }
    // }
});


const invalidField = (field) => {

    if (field.value === "") {
        field.style.border = borderError;
        field.style.backgroundColor = backgroundColorError;

        return true;
    } else {
        field.style.border = "";
        field.style.backgroundColor = "";

        return false;
    }
}
