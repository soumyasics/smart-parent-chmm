export interface Image  {
    fieldname: string, 
    originalname: string,
    encoding: string, 
    mimetype: string, 
    destination: string,
    filename: string,
    path: string
    size: number
}

export interface VideoStructureType  {
    fieldname: string, 
    originalname: string,
    encoding: string, 
    mimetype: string, 
    destination: string,
    filename: string,
    path: string
    size: number
}

export interface UserData {
    _id: string, 
    name: string,
    email: string,
    phoneNumber: number,
    address: string,
    category?: string,
    profilePicture: Image | null, 
}
export type UserType = 'parent' | 'healthProfessional' | 'ashaWorker' | 'vaccineCenter';

export interface UserState {
    isAuthenticated: boolean,
    userId: string| null,
    jsonWebToken: string | null,
    userType: UserType | null, 
    userData: UserData | null,
}

