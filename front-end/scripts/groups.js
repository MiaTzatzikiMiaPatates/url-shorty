import * as groupsRequests from "../api/methods/groupsApi.js";
import * as urlsRequests from "../api/methods/urlsApi.js";
import {createButton, toggleFieldError} from "../utils/helper.js";
import {toggleModal} from "../utils/modal.js";

const table = document.querySelector(".table-data");
const addGroupButton = document.querySelector("#add-new-group");
const modalSubmitButton = document.querySelector(".modal-submit");
const modalGroupForm = document.querySelector("#modal-group-form");
const groupNameInput = document.querySelector("#groupName");

// let currentMode = "";

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
    // currentMode = "rename";


    modalGroupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (nameAlreadyExists(groupNameInput.value)) {
            toggleFieldError(groupNameInput);
        } else {
            await groupsRequests.renameGroup(groupNameInput.value, id);
            location.reload();
        }
        // } else if (currentMode === "rename") {
        //     await groupsRequests.renameGroup(groupNameInput.value, id);
        //     location.reload();
        // }
    });

    toggleModal(groupNameInput);
}

const addGroupEventListener = async () => {
    modalSubmitButton.innerText = "Add Group";
    groupNameInput.value = "";
    // currentMode = "add";

    modalGroupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (nameAlreadyExists(groupNameInput.value) || groupNameInput.value === "") {
            toggleFieldError(groupNameInput);
        } else {
            await groupsRequests.addGroup(groupNameInput.value);
            location.reload();
        }
        // } else if (currentMode === "add") {
        //     await groupsRequests.addGroup(groupNameInput.value);
        //     location.reload();
        // }

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