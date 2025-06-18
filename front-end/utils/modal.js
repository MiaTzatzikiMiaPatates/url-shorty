const modal = document.querySelector(".modal");
const span = document.querySelector(".close");

export const toggleModal = (inputField) => {
    modal.style.display = "block";
    const defaultBorderStyle = inputField.style.border;
    const defaultBackgroundColor = inputField.style.backgroundColor;

    span.onclick = () => {
        modal.style.display = "none";
        inputField.style.border = defaultBorderStyle;
        inputField.style.backgroundColor = defaultBackgroundColor;
    }
}