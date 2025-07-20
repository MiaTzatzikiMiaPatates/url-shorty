import { toggleDefaultField } from "./helper.js";
const modal = document.querySelector(".modal");
const span = document.querySelector(".close");
export const toggleModal = (inputField) => {
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
    };
};
