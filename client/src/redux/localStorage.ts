import { LOCAL_STORAGE_USER_DATA_KEY } from "../config/constant";
import { RootState } from "./store";

export const getDataFromLocalstorage = (): RootState | undefined => {
  try {
    const serializedState =
      localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY) || null;
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log("Couldn't load state from local storage", error);
    return undefined;
  }
};

export const setDataToLocalStorage = (serializedState: RootState): void => {
  try {
    localStorage.setItem(
      LOCAL_STORAGE_USER_DATA_KEY,
      JSON.stringify(serializedState)
    );
  } catch (error) {
    console.log("Couldn't set data to local storage", error);
  }
};
