import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlilce";
import adminReducer from "./reducers/adminSlice";

import { getDataFromLocalstorage, setDataToLocalStorage } from "./localStorage";
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedState = getDataFromLocalstorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});
store.subscribe(() => {
  setDataToLocalStorage({
    user: store.getState().user,
    admin: store.getState().admin,
  });
});
