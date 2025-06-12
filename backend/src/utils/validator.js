import statusCodes from "http-status-codes";


export const validate = (res, fields, type) => {
    for (const [key, value] of Object.entries(fields)) {
        let isInvalid = false;

        if (type === "string" && (value !== "string" || value.trim() === "")) {
            isInvalid = true;
        } else if (type === "number" && isNaN(value)) {
            isInvalid = true;
        } else {
            throw new Error("Invalid type given.");
        }

        if (isInvalid) {
            res
                .status(statusCodes.BAD_REQUEST)
                .json({error: `Missing field ${key}. Field has to be of type ${type}.`});
        }
    }
}