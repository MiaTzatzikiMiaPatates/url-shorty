import * as groupsRequests from "../api/groupsApi.js";
import * as urlsRequests from "../api/urlsApi.js";
import { createButton} from "../utils/element-creator.js";
import {toggleModal} from "../utils/modal.js";
// import {nameAlreadyExists} from "../utils/helper.js"

const table = document.querySelector(".table-data");
const addGroupButton = document.querySelector("#add-new-group");

const modalSubmitButton = document.querySelector(".modal-submit");
const groupNameInput = document.querySelector("#groupName");

const groups = await groupsRequests.getAllGroups();
const urlsCountByGroup = await urlsRequests.getUrlsCountPerGroup();

addGroupButton.addEventListener("click", async () => addGroupEventListener());


const createTable = async () => {

    for (const [key, value] of Object.entries(groups)) {
        const groupId = value.id;

        let row = table.insertRow(-1);
        row.setAttribute("id", groupId)

        let nameCell = row.insertCell(0);
        nameCell.innerText = value.name;

        let urlsCell = row.insertCell(1)
        urlsCell.innerText = getUrlsCountById(groupId);

        let buttonCell = row.insertCell(2);
        let renameButton = createButton("rename-button", "Rename");
        let deleteButton = createButton("delete-button", "Delete");
        buttonCell.append(renameButton, deleteButton);

        renameButton.addEventListener("click", async  () => renameGroupEventListener(row.id, value.name));
        deleteButton.addEventListener("click", async () => deleteGroupEventListener(row.id));
    }
}

const deleteGroupEventListener = async (id) => {
    const response = await groupsRequests.deleteGroup(id);
    const row = document.getElementById(`${id}`);

    if (!response.ok) {
        row.style.backgroundColor = "#ffe6e6";
    } else {
        location.reload();
    }
}

const renameGroupEventListener = async (id, name) => {
    modalSubmitButton.innerText = "Rename Group";
    groupNameInput.value = name;

    modalSubmitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        if (nameAlreadyExists(groupNameInput.value)) {
            groupNameInput.style.border = "2px solid red";
            groupNameInput.style.backgroundColor = "#ffe6e6";
        } else {
            await groupsRequests.renameGroup(groupNameInput.value, id);
            location.reload();
        }
    });

    toggleModal(groupNameInput);
}

const addGroupEventListener = async (name) => {
    modalSubmitButton.innerText = "Add Group";
    groupNameInput.value = "";

    modalSubmitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        if (nameAlreadyExists(groupNameInput.value) || groupNameInput.value === "") {
            groupNameInput.style.border = "2px solid red";
            groupNameInput.style.backgroundColor = "#ffe6e6";
        } else {
            await groupsRequests.addGroup(groupNameInput.value);
            location.reload();
        }
    });

    toggleModal(groupNameInput);
}

const nameAlreadyExists = (name) => {
    for (const [key, value] of Object.entries(groups)) {
        if (value.name.toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

const getUrlsCountById = (id) => {
    for (const [key, value] of Object.entries(urlsCountByGroup)) {
        if (value.groupId  === id) {
            return value.urlCount;
        }
    }
    return 0;
}


await createTable();