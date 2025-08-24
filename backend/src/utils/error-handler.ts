import * as z from "zod";
import statusCodes from "http-status-codes";
import {MAX_SHORT_URL_LENGTH} from "../config/constants.js";
import {Response} from 'express';
import {SqliteError} from "better-sqlite3";


export const errorHandler = (error: unknown, res: Response, message?: string) => {
    if (error instanceof z.ZodError) {
        if (error.issues.find((element) => element.code === 'too_big')) {
            res
                .status(statusCodes.REQUEST_URI_TOO_LONG)
                .json({error: `Short URL length can't exceed ${MAX_SHORT_URL_LENGTH}.`});
        } else {
            res
                .status(statusCodes.BAD_REQUEST)
                .json({error: error.issues});
        }
    } else if (error instanceof SqliteError) {
        if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
            res
                .status(statusCodes.CONFLICT)
                .json({error: message})
        }
    } else {
        res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json({error: error});
    }
}