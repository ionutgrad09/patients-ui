// export const BASE_URL = "http://localhost:8080/api";
export const BASE_URL = "https://patients-api-zyvs.onrender.com/api";

export const JWT = "jwt";
export const CNP = "cnp";
export const EMAIL = "email";

export const API = {
    // Auth
    login: "/login",
    getCurrentUser: "/currentUser",
    observer: "/observer",

    // Patients
    patient: "/patient",

    // Daily Status
    updateDailyStatus: "/daily-status",

    // Units
    getAllUnits: "/unit/all",
    unit: "/unit",

    // Users
    user: "/user",


    // Functions
    getAllPatients: (unitId: number) => `/patient/all?unitId=${unitId}`,
    getPatient: (id: string) => `/patient?patientId=${id}`,
    getContactPerson: (patientId: string) => `/patient/contact-person?patientId=${patientId}`,
    getDailyStatus: (patientId: string, timestamp: number) => `/daily-status?patientId=${patientId}&timestamp=${timestamp}`,
    getAllUsers: (unitId: number | null) => unitId ? `/user/all?unitId=${unitId}` : `/user/all`,
    deleteUser: (username: string) => `/user?username=${username}`,
    deletePatient: (patientId: string) => `/patient?patientId=${patientId}`,

    getDailyStatusForObserver: (patientId: string, timestamp: number, observerEmail: string) =>
        `/observer/daily-status?patientId=${patientId}&timestamp=${timestamp}&observerEmail=${observerEmail}`,
    getPatientForObserver: (patientId: string, observerEmail: string) =>
        `/observer/patient?patientId=${patientId}&observerEmail=${observerEmail}`,
}