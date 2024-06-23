import { HealthProfessionalData, VaccinationCenterData } from "./userTypes";

export const isVaccinationCenterData = (
  data: any
): data is VaccinationCenterData => {
  return data && data.category !== undefined;
};

export const isHealthProfessionalData = (
  data: any
): data is HealthProfessionalData => {
  return data && data.category !== undefined;
}