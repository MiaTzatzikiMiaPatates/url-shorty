import * as urlsRequests from "../api/urlsApi.js";
import * as groupsRequests from "../api/groupsApi.js";
import {createButton} from "../utils/element-creator.js";
import {toggleModal} from "../utils/modal.js";
// import {nameAlreadyExists} from "../utils/helper.js"

const table = document.querySelector(".table-data");
const addUrlButton = document.querySelector("#add-new-url");
const shortUrlInput = document.querySelector("#shortUrl");
const longUrlInput = document.querySelector("#longUrl");
const groupsSelector = document.querySelector("#groupsSelector");
const modalSubmitButton = document.querySelector(".modal-submit");

const urls = await urlsRequests.getAllUrls();
const groups = await groupsRequests.getAllGroups();


const createTable = async () => {
    for (const [key, value] of Object.entries(urls)) {
        const shortUrl = value.shortUrl;
        const longUrl = value.longUrl;
        const groupName = getGroupById(value.groupId);
        const groupId = value.groupId;
        const urlId = value.id;

        const row = table.insertRow(-1);
        row.setAttribute("id", urlId);

        const shortUrlCell = row.insertCell(0);
        shortUrlCell.innerText = shortUrl;

        const longUrlCell = row.insertCell(1);
        // longUrlCell.style.width = "40%";
        longUrlCell.innerText = longUrl;

        const groupCell = row.insertCell(2);
        groupCell.innerText = groupName;

        const buttonsCell = row.insertCell(3);
        const editButton = createButton("edit-button", "Edit");
        const deleteButton = createButton("delete-button", "Delete");
        buttonsCell.append(editButton, deleteButton);

        editButton.addEventListener("click", async () => editUrlEventListener(urlId, shortUrl, longUrl, groupId));
        deleteButton.addEventListener("click", async () => deleteUrlEventListener(urlId));
    }
    createSelectOptions();
}

const getGroupById = (id) => {
    for (const [key, value] of Object.entries(groups)) {
        if (value.id === id) {
            return value.name;
        }
    }
}

const editUrlEventListener = async (id, shortUrl, longUrl, groupId) => {
    modalSubmitButton.innerText = "Edit URL";
    shortUrlInput.value = shortUrl;
    longUrlInput.value = longUrl;
    groupsSelector.value = groupId;

    const oldShortUrlValue = shortUrl;

    modalSubmitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        if ((nameAlreadyExists(shortUrlInput.value) && oldShortUrlValue !== shortUrlInput.value) || shortUrlInput.value === "") {
            shortUrlInput.style.border = "2px solid red";
            shortUrlInput.style.backgroundColor = "#ffe6e6";
        } else {
            const data = {
                shortUrl: shortUrlInput.value,
                longUrl: longUrlInput.value,
                groupId: groupsSelector.value
            }
            await urlsRequests.editUrl(id, data)
            location.reload();
        }
    });

    toggleModal(shortUrlInput);
}

export const deleteUrlEventListener = async (id) => {
    const response = await urlsRequests.deleteUrl(id);

    if (!response.ok) {
        alert("Something went very wrong");
    } else {
        location.reload();
    }
}


const createSelectOptions = () => {
    groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.id;
        option.textContent = group.name;
        groupsSelector.appendChild(option);
    });
}

export const nameAlreadyExists = (name) => {
    for (const [key, value] of Object.entries(urls)) {
        if (value.shortUrl.toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }
    return false;
}


await createTable();