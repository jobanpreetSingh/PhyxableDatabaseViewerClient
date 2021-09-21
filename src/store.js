import { createStore } from 'redux'
import { rootReducer } from '../src/Reducer/index'
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());