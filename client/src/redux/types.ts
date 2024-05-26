export interface ProfilePicture {
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
    profilePicture: ProfilePicture | null, 
    specaility?: string, // this optional field only for health professsional
    licenseNumber?: string // this optional field only for vaccination center
}
export type UserType = 'parent' | 'healthProfessional' | 'ashaWorker' | 'vaccineCenter';

export interface UserState {
    isAuthenticated: boolean,
    userId: string| null,
    userType: UserType | null, 
    userData: UserData | null
}

