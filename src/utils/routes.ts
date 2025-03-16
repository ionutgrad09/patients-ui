

export const ROUTES = {
    Login: "/login",
    NotFound: `/notFound`,

    Patients: `/patients`,
    AddPatient: `/add`,
    EditPatient: `/add/:id`,
    Patient: `/patients/:id`,

    Units: `/units`,
    Users: `/users`,

    ViewStatus: `/status`,

    PatientPathCreator: (id: string) => `/patients/${id}`,
    EditPatientCreator: (id: string) => `/add/${id}`

}