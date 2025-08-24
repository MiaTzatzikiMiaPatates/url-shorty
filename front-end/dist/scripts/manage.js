import * as urlsRequests from "../api/methods/urlsApi.js";
import * as groupsRequests from "../api/methods/groupsApi.js";
import { createAnchorElement, createButton, createSelectOptions, formatLongUrl } from "../utils/helper.js";
import { toggleModal } from "../utils/modal.js";
import { BASE_URL } from "../api/endpoints.js";
import * as helpers from "../utils/helper.js";
const table = document.querySelector(".table-data");
const shortUrlInput = document.querySelector("#shortUrl");
const longUrlInput = document.querySelector("#longUrl");
const groupsSelector = document.querySelector("#groupsSelector");
const modalSubmitButton = document.querySelector(".modal-submit");
const modalUrlForm = document.querySelector("#modal-url-form");
const urls = await urlsRequests.getAllUrls();
const groups = await groupsRequests.getAllGroups();
let oldShortUrlValue;
let idToChange;
const createTable = async () => {
    urls.forEach((url) => {
        const shortUrl = url.shortUrl;
        const longUrl = url.longUrl;
        const groupName = groups.find((group) => group.id === url.groupId).name;
        const groupId = url.groupId;
        const urlId = url.id;
        const link = BASE_URL + shortUrl;
        const row = table.insertRow(-1);
        row.setAttribute("id", urlId.toString());
        const shortUrlCell = row.insertCell(0);
        shortUrlCell.append(createAnchorElement(link, undefined, undefined, link));
        const longUrlCell = row.insertCell(1);
        longUrlCell.append(createAnchorElement(longUrl, undefined, undefined, formatLongUrl(longUrl)));
        const groupCell = row.insertCell(2);
        groupCell.innerText = groupName;
        const buttonsCell = row.insertCell(3);
        const editButton = createButton("edit-button", "Edit");
        const deleteButton = createButton("delete-button", "Delete");
        buttonsCell.append(editButton, deleteButton);
        editButton.addEventListener("click", async () => editUrlEventListener(urlId, shortUrl, longUrl, groupId));
        deleteButton.addEventListener("click", async () => deleteUrlEventListener(urlId));
    });
    createSelectOptions(groups, groupsSelector);
};
const editUrlEventListener = async (id, shortUrl, longUrl, groupId) => {
    modalSubmitButton.innerText = "Edit URL";
    shortUrlInput.value = shortUrl;
    longUrlInput.value = longUrl;
    groupsSelector.value = groupId.toString();
    oldShortUrlValue = shortUrl;
    idToChange = id;
    toggleModal(shortUrlInput);
};
const editUrlModal = async (event) => {
    event.preventDefault();
    if ((urls.some(element => element.shortUrl === shortUrlInput.value) && oldShortUrlValue !== shortUrlInput.value) || shortUrlInput.value === "") {
        helpers.toggleFieldError(shortUrlInput);
    }
    else {
        const data = {
            shortUrl: shortUrlInput.value,
            longUrl: longUrlInput.value,
            groupId: Number(groupsSelector.value)
        };
        const response = await urlsRequests.editUrl(idToChange, data);
        if (response.status === 414 || response.status === 409) {
            helpers.toggleFieldError(shortUrlInput);
        }
        else {
            location.reload();
        }
    }
};
export const deleteUrlEventListener = async (id) => {
    const response = await urlsRequests.deleteUrl(id);
    if (!response.ok) {
        alert("Something went VERY wrong");
    }
    else {
        document.getElementById(id.toString())?.remove();
    }
};
modalUrlForm.addEventListener("submit", async (event) => editUrlModal(event));
await createTable();
