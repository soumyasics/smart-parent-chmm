import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlilce";
import { getDataFromLocalstorage, setDataToLocalStorage } from "./localStorage";
const rootReducer = combineReducers({
  user: userReducer,
  // todo=>other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedState = getDataFromLocalstorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});
store.subscribe(() => {
  setDataToLocalStorage({ user: store.getState().user });
});
