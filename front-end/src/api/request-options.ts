import {RequestMethods} from "./request-methods.js"

export interface RequestOptions {
    method: RequestMethods,
    headers: {},
    body?: string
}