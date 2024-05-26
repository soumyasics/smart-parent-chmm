import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './reducers/userSlilce'
const rootReducer = combineReducers({
    user: userReducer
    // todo=>other reducers here
})

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer
})