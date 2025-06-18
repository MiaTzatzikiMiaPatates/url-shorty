import statusCodes from "http-status-codes";

const specialCharacters = "!@#$%^&*()-_=+[{]}\|;:',<.>/?";

export const validateRequest = (res, fields, type) => {
    for (const [key, value] of Object.entries(fields)) {
        // let isInvalid = false;

        if (type === "string") {
            if (typeof value !== "string" || value.trim() === "") {
                res.status(statusCodes.BAD_REQUEST)
                    .json({ error: `Missing or empty field '${key}'. Must be a non-empty string.` });
                return true;
            }

            // if (containsSpecialChar(value)) {
            //     res.status(statusCodes.BAD_REQUEST)
            //         .json({ error: `Field '${key}' contains invalid special characters.` });
            //     return true;
            // }
        } else if (type === "number") {
            if (isNaN(value)) {
                res.status(statusCodes.BAD_REQUEST)
                    .json({ error: `Field '${key}' must be a valid number.` });
                return true;
            }
        }
        // if (type === "string" && (typeof value !== "string" || value.trim() === "" || containsSpecialChar(value))) {
        //     isInvalid = true;
        // } else if (type === "number" && isNaN(value)) {
        //     isInvalid = true;
        // }
        //
        // if (isInvalid) {
        //     res
        //         .status(statusCodes.BAD_REQUEST)
        //         .json({error: `Missing field ${key}. Field has to be of type ${type}.`});
        //
        //     return true;
        // }

    }
    return false;
}

export const containsSpecialChar = (word) => {
    for (const c of specialCharacters) {
        if (word.includes(c)) {
            return true;
        }
    }

    return false;
}


export const validateShortUrl = (name) => {

}