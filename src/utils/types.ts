export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR"
}

export type Gender = "Barbat" | "Femeie";

export type User = {
    username: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: string,
    unitId: number,
    permissions: AppPermission[]
}

export interface Patient {
    patientId: string,
    firstName: string,
    lastName: string,
    gender: string,
    dateOfBirth: number,

    mentions: string;
    recommendation: string;
    diseases: string;

    unitId: number;
    contactPersons?: ContactPerson[]
}


export interface Unit {
    id: number,
    name: string
}

export type PatientRequest = Omit<Patient, "id">

export interface DailyStatus {
    patientId: number, // patient identifier
    timestamp: number,
    activities: string | null,
    mentions: string | null,
    medication: string | null,
    healthCondition: string | null,
    meals: string | null,
    assignedTo: string | null,
}

export interface ContactPerson {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
}

export enum AppPermission {
    VIEW_PATIENT = "VIEW_PATIENT",
    CREATE_PATIENT = "CREATE_PATIENT",
    UPDATE_DAILY_STATUS = "UPDATE_DAILY_STATUS",
    VIEW_USER = "VIEW_USER",
    CREATE_USER = "CREATE_USER",
    VIEW_UNIT = "VIEW_UNIT",
    CREATE_UNIT = "CREATE_UNIT"
};