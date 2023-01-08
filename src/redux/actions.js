import {FILTER} from "./types"
export const addToText = (addInfo) => {
    return {
        type: FILTER,
        payload: addInfo
    }
}
