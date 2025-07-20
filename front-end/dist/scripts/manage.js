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
        editButton.addEventListener("click", async () => editUrlEventListener(urlId.toString(), shortUrl, longUrl, groupId.toString()));
        deleteButton.addEventListener("click", async () => deleteUrlEventListener(urlId.toString()));
    });
    createSelectOptions(groups, groupsSelector);
};
const editUrlEventListener = async (id, shortUrl, longUrl, groupId) => {
    modalSubmitButton.innerText = "Edit URL";
    shortUrlInput.value = shortUrl;
    longUrlInput.value = longUrl;
    groupsSelector.value = groupId;
    const oldShortUrlValue = shortUrl;
    modalUrlForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if ((urls.some(element => element.shortUrl === shortUrlInput.value) && oldShortUrlValue !== shortUrlInput.value) || shortUrlInput.value === "") {
            helpers.toggleFieldError(shortUrlInput);
        }
        else {
            const data = {
                shortUrl: shortUrlInput.value,
                longUrl: longUrlInput.value,
                groupId: groupsSelector.value
            };
            const response = await urlsRequests.editUrl(id, data);
            if (response.status === 414) {
                helpers.toggleFieldError(shortUrlInput);
            }
            else {
                location.reload();
            }
        }
    });
    toggleModal(shortUrlInput);
};
export const deleteUrlEventListener = async (id) => {
    const response = await urlsRequests.deleteUrl(id);
    if (!response.ok) {
        alert("Something went VERY wrong");
    }
    else {
        location.reload();
    }
};
await createTable();
