const borderError = "2px solid red";
const backgroundColorError = "#ffe6e6";

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
    const defaultBorderColor = field.style.border;
    const defaultBackgroundColor = field.style.backgroundColor;

    field.style.border = borderError;
    field.style.backgroundColor = backgroundColorError;
}