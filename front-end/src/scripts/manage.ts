import * as urlsRequests from "../api/methods/urlsApi.js";
import * as groupsRequests from "../api/methods/groupsApi.js";
import {createAnchorElement, createButton, createSelectOptions, formatLongUrl} from "../utils/helper.js";
import {toggleModal} from "../utils/modal.js";
import {BASE_URL} from "../api/endpoints.js";
import * as helpers from "../utils/helper.js";
import {Url} from "../models/url.js";
import {Group} from "../models/group.js";

const table = document.querySelector(".table-data") as HTMLTableElement;
const shortUrlInput = document.querySelector("#shortUrl") as HTMLInputElement;
const longUrlInput = document.querySelector("#longUrl") as HTMLInputElement;
const groupsSelector = document.querySelector("#groupsSelector") as HTMLInputElement;
const modalSubmitButton = document.querySelector(".modal-submit") as HTMLButtonElement;
const modalUrlForm = document.querySelector("#modal-url-form") as HTMLFormElement;

const urls: Url[] = await urlsRequests.getAllUrls();
const groups: Group[] = await groupsRequests.getAllGroups();

let oldShortUrlValue: string;
let idToChange: number;

const createTable = async (): Promise<void> => {
    urls.forEach((url: Url): void => {
        const shortUrl: string = url.shortUrl;
        const longUrl: string = url.longUrl;
        const groupName: string = groups.find((group) => group.id === url.groupId)!.name;
        const groupId: number = url.groupId;
        const urlId: number = url.id as number;
        const link: string = BASE_URL + shortUrl;

        const row: HTMLTableRowElement = table.insertRow(-1);
        row.setAttribute("id", urlId.toString());

        const shortUrlCell: HTMLTableCellElement = row.insertCell(0);
        shortUrlCell.append(createAnchorElement(link, undefined, undefined, link))

        const longUrlCell: HTMLTableCellElement = row.insertCell(1);
        longUrlCell.append(createAnchorElement(longUrl, undefined, undefined, formatLongUrl(longUrl)));

        const groupCell: HTMLTableCellElement = row.insertCell(2);
        groupCell.innerText = groupName;

        const buttonsCell: HTMLTableCellElement = row.insertCell(3);
        const editButton: HTMLButtonElement = createButton("edit-button", "Edit");
        const deleteButton: HTMLButtonElement = createButton("delete-button", "Delete");
        buttonsCell.append(editButton, deleteButton);

        editButton.addEventListener("click", async () => editUrlEventListener(urlId, shortUrl, longUrl, groupId));
        deleteButton.addEventListener("click", async () => deleteUrlEventListener(urlId));
    });

    createSelectOptions(groups, groupsSelector);
}

const editUrlEventListener = async (id: number, shortUrl: string, longUrl: string, groupId: number): Promise<void> => {
    modalSubmitButton.innerText = "Edit URL";
    shortUrlInput.value = shortUrl;
    longUrlInput.value = longUrl;
    groupsSelector.value = groupId.toString();

    oldShortUrlValue = shortUrl;
    idToChange = id;

    toggleModal(shortUrlInput);
}


const editUrlModal = async (event: Event): Promise<void> => {
    event.preventDefault();

    if ((urls.some(element => element.shortUrl === shortUrlInput.value) && oldShortUrlValue !== shortUrlInput.value) || shortUrlInput.value === "") {
        helpers.toggleFieldError(shortUrlInput);
    } else {
        const data: Url = {
            shortUrl: shortUrlInput.value,
            longUrl: longUrlInput.value,
            groupId: Number(groupsSelector.value)
        }

        const response = await urlsRequests.editUrl(idToChange, data)

        if (response.status === 414 || response.status === 409) {
            helpers.toggleFieldError(shortUrlInput);
        } else {
            location.reload();
        }
    }
}


export const deleteUrlEventListener = async (id: number): Promise<void> => {
    const response = await urlsRequests.deleteUrl(id);

    if (!response.ok) {
        alert("Something went VERY wrong");
    } else {
        document.getElementById(id.toString())?.remove();
    }
}

modalUrlForm.addEventListener("submit", async (event): Promise<void> => editUrlModal(event));

await createTable();