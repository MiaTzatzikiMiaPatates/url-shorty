const inputErrorClass = "input-error";
const maxLength = 60;


export const createSelectOptions = (data: any[], elementSelector: HTMLElement): void => {
    data.forEach(element => {
        const option: HTMLOptionElement = document.createElement('option');
        option.value = element.id;
        option.textContent = element.name;
        elementSelector.appendChild(option);
    });
}


export const toggleFieldError = (field: HTMLElement): void => {
    field.classList.add(inputErrorClass);
}

export const toggleDefaultField = (field: HTMLElement): void => {
    field.classList.remove(inputErrorClass);
}

export const createElement = (tagName: string, className?: string, idName?: string,  text?: string): HTMLElement => {
    const element = document.createElement(tagName);

    if (className) element.classList.add(className);
    if (idName) element.setAttribute("id", idName);
    if (text) element.innerText = text;

    return element;
}

export const createButton = (className: string, text: string): HTMLButtonElement => {
    return createElement("button", className, undefined, text) as HTMLButtonElement;
}

export const createAnchorElement = (href: string, className?: string, idName?: string, text?: string): HTMLAnchorElement => {
    const anchorElement = createElement("a", className, idName, text);
    anchorElement.setAttribute("href", href);

    return anchorElement as HTMLAnchorElement;
}


export const formatLongUrl = (longUrl: string): string => {
    return longUrl.length > maxLength ? longUrl.slice(0, maxLength) + "..." : longUrl;
}