import { READ_DATA, DELETE_DATA, ADD_DATA } from "../constants"

const intialState = {}

export const readDataReducer = (state = intialState, action) => {

    switch (action.type) {
        case READ_DATA: return action.payload;
        default:
            return state;
    }

}

const updateState = {}

export const updateReducer = (state = updateState, action) => {

    switch (action.type) {

        case ADD_DATA: return action.payload;
        case DELETE_DATA: return action.payload;

        default:
            return state;
    }

}

