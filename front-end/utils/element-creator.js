

export const createButton = (className, text) => {
    const button = document.createElement("button");
    button.className = className;
    button.innerText = text;

    return button;
}