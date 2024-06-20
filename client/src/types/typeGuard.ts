import { VaccinationCenterData } from "./userTypes";

export const isVaccinationCenterData = (
  data: any
): data is VaccinationCenterData => {
  return data && data.category !== undefined;
};
