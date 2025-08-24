import * as groupsRequests from "../api/methods/groupsApi.js";
import * as urlsRequests from "../api/methods/urlsApi.js";
import {createButton, toggleFieldError} from "../utils/helper.js";
import {toggleModal} from "../utils/modal.js";
import {Group} from "../models/group.js";
import {UrlsGroupCount} from "../models/urls-group-count.js";

const table = document.querySelector(".table-data") as HTMLTableElement;
const addGroupButton = document.querySelector("#add-new-group") as HTMLButtonElement;
const modalSubmitButton = document.querySelector(".modal-submit") as HTMLButtonElement;
const modalGroupForm = document.querySelector("#modal-group-form") as HTMLFormElement;
const groupNameInput = document.querySelector("#groupName") as HTMLInputElement;

let currentMode: string;
let groupIdToRename: number;

const groups: Group[]  = await groupsRequests.getAllGroups();
const urlsCountByGroup: UrlsGroupCount[] = await urlsRequests.getUrlsCountPerGroup();

addGroupButton.addEventListener("click", async () => addGroupEventListener());
modalGroupForm.addEventListener("submit", async (event) => modalGroupEventListener(event));

const createTable = async () => {

    groups.forEach((group) => {
        const groupId = group.id;

        const row = table.insertRow(-1);
        row.setAttribute("id", groupId.toString())
        const rowId = Number(row.id);

        const nameCell = row.insertCell(0);
        nameCell.innerText = group.name;

        const urlsCell = row.insertCell(1)
        urlsCell.innerText = getUrlsCountById(groupId).toString();

        const buttonCell = row.insertCell(2);
        const renameButton = createButton("rename-button", "Rename");
        const deleteButton = createButton("delete-button", "Delete");
        buttonCell.append(renameButton, deleteButton);

        renameButton.addEventListener("click", async  () => renameGroupEventListener(rowId, group.name));
        deleteButton.addEventListener("click", async () => deleteGroupEventListener(rowId));
    });
}

const deleteGroupEventListener = async (id: number) => {
    const response = await groupsRequests.deleteGroup(id);
    const row = document.getElementById(`${id}`) as HTMLTableRowElement;

    if (!response.ok) {
        toggleFieldError(row, false);
        // row.style.backgroundColor = "#ffe6e6";
    } else {
        location.reload();
    }
}

const renameGroupEventListener = async (id: number, name: string) => {
    modalSubmitButton.innerText = "Rename Group";
    groupNameInput.value = name;
    groupIdToRename = id;
    currentMode = "rename";

    toggleModal(groupNameInput);
}

const addGroupEventListener = async () => {
    modalSubmitButton.innerText = "Add Group";
    groupNameInput.value = "";
    currentMode = "add";

    toggleModal(groupNameInput);
}


const modalGroupEventListener = async (event: SubmitEvent) => {
    event.preventDefault();

    if (groupNameAlreadyExists(groupNameInput.value) || groupNameInput.value === "") {
        toggleFieldError(groupNameInput);
    } else {
        if (currentMode === "add") {
            await groupsRequests.addGroup(groupNameInput.value);
        } else if (currentMode === "rename") {
            await groupsRequests.renameGroup(groupNameInput.value, groupIdToRename);
        }
        location.reload();
    }
}

const groupNameAlreadyExists = (name: string) => {
    return groups.find((group) => group.name.toLowerCase() === name.toLowerCase());
}

const getUrlsCountById = (id: number) => {
    return urlsCountByGroup.find((element) => element.groupId === id)?.urlCount ?? 0;
}


await createTable();