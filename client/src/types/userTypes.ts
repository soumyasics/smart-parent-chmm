export interface ProfilePicture {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface BaseData {
  _id: string;
  email: string;
  name: string;
}
export interface ParentData extends BaseData {
  _id: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: number;
  address: string;
  dateOfBirth: string;
  isActive: string;
  parentalStatus: string;
  profilePicture: ProfilePicture;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface HealthProfessionalData extends BaseData {
  password: string;
  phoneNumber: number;
  address: string;
  category: string;
  department: string;
  qualification: string;
  profilePicture: ProfilePicture;
  certificateImg: ProfilePicture;
  isActive: string;
  isAdminApproved: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  __v: number;
}

export interface VaccinationCenterData extends BaseData {
  password: string;
  phoneNumber: number;
  address: string;
  category: string;
  profilePicture: ProfilePicture;
  isActive: boolean;
  isAdminApproved: string;
  createdAt: string;
  updatedAt: string;
  district: string;
  __v: number;
}

export interface AshaWorkerData extends BaseData {
  password: string;
  phoneNumber: number;
  address: string;
  dateOfBirth: string;
  gender: string;
  experience: string;
  qualification: string;
  profilePicture: ProfilePicture;
  isActive: string;
  isAdminApproved: string;
  feedback: any[];
  joinedDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export type AllUsersType = ParentData | HealthProfessionalData | VaccinationCenterData | AshaWorkerData