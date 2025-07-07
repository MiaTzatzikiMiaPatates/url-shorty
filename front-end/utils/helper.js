const inputErrorClass = "input-error";
const maxLength = 60;


export const createSelectOptions = (data, elementSelector) => {
    data.forEach(element => {
        const option = document.createElement('option');
        option.value = element.id;
        option.textContent = element.name;
        elementSelector.appendChild(option);
    });
}


export const toggleFieldError = (field) => {
    field.classList.add(inputErrorClass);
}

export const toggleDefaultField = (field) => {
    field.classList.remove(inputErrorClass);
}

export const createElement = (tagName, className, idName,  text) => {
    const element = document.createElement(tagName);

    if (className !== null) element.classList.add(className);
    if (idName !== null) element.setAttribute("id", idName);

    element.innerText = text;

    return element;
}

export const createButton = (className, text) => {
    return createElement("button", className, null, text);
}

export const createAnchorElement = (className, idName, text, href) => {
    const anchorElement = createElement("a", className, idName, text);
    anchorElement.setAttribute("href", href);

    return anchorElement;
}


export const formatLongUrl = (longUrl) => {
    return longUrl.length > maxLength ? longUrl.slice(0, maxLength) + "..." : longUrl;
}