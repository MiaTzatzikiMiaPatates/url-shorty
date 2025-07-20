import * as urlsRequests from "../api/methods/urlsApi.js";
import * as groupsRequests from "../api/methods/groupsApi.js";
import {createAnchorElement, createButton, createSelectOptions, formatLongUrl} from "../utils/helper.js";
import {toggleModal} from "../utils/modal.js";
import {BASE_URL} from "../api/endpoints.js";
import * as helpers from "../utils/helper.js";
import {Url} from "../models/url.js";
import {Group} from "../models/group";


const table = document.querySelector(".table-data") as HTMLTableElement;
const shortUrlInput = document.querySelector("#shortUrl") as HTMLInputElement;
const longUrlInput = document.querySelector("#longUrl") as HTMLInputElement;
const groupsSelector = document.querySelector("#groupsSelector") as HTMLInputElement;
const modalSubmitButton = document.querySelector(".modal-submit") as HTMLButtonElement;
const modalUrlForm = document.querySelector("#modal-url-form") as HTMLFormElement;


const urls: Url[] = await urlsRequests.getAllUrls();
const groups: Group[] = await groupsRequests.getAllGroups();

const createTable = async (): Promise<void> => {
    urls.forEach((url: Url): void => {
        const shortUrl: string = url.shortUrl;
        const longUrl: string = url.longUrl;
        const groupName: string = groups.find((group) => group.id === url.groupId)!.name;
        const groupId: number = url.groupId;
        const urlId: number = url.id;
        const link: string = BASE_URL + shortUrl;

        const row = table.insertRow(-1);
        row.setAttribute("id", urlId.toString());

        const shortUrlCell = row.insertCell(0);
        shortUrlCell.append(createAnchorElement(link, undefined, undefined, link))

        const longUrlCell = row.insertCell(1);
        longUrlCell.append(createAnchorElement(longUrl, undefined, undefined, formatLongUrl(longUrl)));

        const groupCell = row.insertCell(2);
        groupCell.innerText = groupName;

        const buttonsCell: HTMLTableCellElement = row.insertCell(3);
        const editButton: HTMLButtonElement = createButton("edit-button", "Edit");
        const deleteButton: HTMLButtonElement = createButton("delete-button", "Delete");
        buttonsCell.append(editButton, deleteButton);

        editButton.addEventListener("click", async () => editUrlEventListener(urlId.toString(), shortUrl, longUrl, groupId.toString()));
        deleteButton.addEventListener("click", async () => deleteUrlEventListener(urlId.toString()));
    });
    createSelectOptions(groups, groupsSelector);
}


const editUrlEventListener = async (id: string, shortUrl: string, longUrl: string, groupId: string): Promise<void> => {
    modalSubmitButton.innerText = "Edit URL";
    shortUrlInput.value = shortUrl;
    longUrlInput.value = longUrl;
    groupsSelector.value = groupId;

    const oldShortUrlValue = shortUrl;

    modalUrlForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if ((urls.some(element => element.shortUrl === shortUrlInput.value) && oldShortUrlValue !== shortUrlInput.value) || shortUrlInput.value === "") {
            helpers.toggleFieldError(shortUrlInput);
        } else {
            const data = {
                shortUrl: shortUrlInput.value,
                longUrl: longUrlInput.value,
                groupId: groupsSelector.value
            }
            const response = await urlsRequests.editUrl(id, data)

            if (response.status === 414) {
                helpers.toggleFieldError(shortUrlInput);
            } else {
                location.reload();
            }
        }
    });

    toggleModal(shortUrlInput);
}

export const deleteUrlEventListener = async (id: string): Promise<void> => {
    const response = await urlsRequests.deleteUrl(id);

    if (!response.ok) {
        alert("Something went VERY wrong");
    } else {
        location.reload();
    }
}


await createTable();