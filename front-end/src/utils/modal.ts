import {toggleDefaultField} from "./helper.js";

const modal = document.querySelector(".modal") as HTMLElement;
const span = document.querySelector(".close") as HTMLElement;

export const toggleModal = (inputField: HTMLInputElement) => {
    if (!modal || !span) {
        return;
    }

    modal.style.display = "block";
    // const defaultBorderStyle = inputField.style.border;
    // const defaultBackgroundColor = inputField.style.backgroundColor;

    span.onclick = () => {
        modal.style.display = "none";
        toggleDefaultField(inputField);
        // inputField.classList.remove("input-error");
        // inputField.style.border = defaultBorderStyle;
        // inputField.style.backgroundColor = defaultBackgroundColor;
    }
}