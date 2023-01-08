import { FILTER } from "./types";
import { addToText } from "./actions";

const initialState = {
    text: ""
}

export const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER:
            return {
           ...state, text:action.payload
       }   
           break;
       default: return state
           break;
   }
}
