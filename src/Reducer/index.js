import { combineReducers } from 'redux'
import { readDataReducer, updateReducer } from '../Reducer/Reducers'
export const rootReducer = combineReducers({
    readDataReducer, updateReducer
})