export interface ActivityData {
  activityDate: string;
  activityName: string;
  activityTimeHrs: string;
  activityTimeMins: string;
  parentId: string | null;
}
export interface AddNewVaccineType {
  vaccinationCenterId: string;
  vaccineName: string;
  vaccineDescription: string;
  numberOfAvailableSlots: string;
  expiryDate: string;
  sideEffects: string;
  ageGroup: string;
  dosageMl: string;
}