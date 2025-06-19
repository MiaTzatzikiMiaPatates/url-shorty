const inputErrorClass = "input-error";

export const createSelectOptions = (groups) => {
    const groupsSelector = document.querySelector("#groupsSelector");

    groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.id;
        option.textContent = group.name;
        groupsSelector.appendChild(option);
    });
}


export const toggleFieldError = (field) => {
    field.classList.add(inputErrorClass);
}

export const toggleDefaultField = (field) => {
    field.classList.remove(inputErrorClass);
}