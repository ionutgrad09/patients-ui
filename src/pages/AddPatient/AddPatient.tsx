import React, {FC, useContext, useEffect, useState} from "react";
import PersonalInformationForm from "./components/AddPeronalInformation";
import ContactPersons from "./components/AddContactPersons";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTES} from "../../utils/routes";
import {Box, Button} from "@mui/material";
import {Patient, Role, Unit} from "../../utils/types";
import {getReq, postReq} from "../../utils/axios";
import {API} from "../../utils/constants";
import {AuthContext} from "../../contexts/AuthProvider";
import {handleError, handleInfo, handleSuccess} from "../../utils/notifications";


export type AddPatientType = Omit<Patient, "id">;

const PERSONAL_INFORMATION_INITIAL_STATE: AddPatientType = {
    firstName: "",
    lastName: "",
    patientId: "",
    dateOfBirth: 0,
    gender: "",
    diseases: "",
    mentions: "",
    recommendation: "",
    unitId: -1,
    contactPersons: []
}


const AddPatient: FC = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const {id} = useParams()

    const [patient, setPatient] = useState<AddPatientType>(PERSONAL_INFORMATION_INITIAL_STATE)
    const [units, setUnits] = useState<Unit[]>([])
    const [validationPersonalInformationErrors, setValidationPersonalInformationErrors] = useState<{ [key: string]: string }>({});
    const [validationContactPersonsErrors, setValidationContactPersonsErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (user?.role === Role.SUPER_ADMIN) {
            getReq(API.getAllUnits).then((unitsResponse) => {
                setUnits(unitsResponse?.data || [])
            }).catch(handleError)
        }

    }, [user])

    useEffect(() => {
        if (id) {
            getReq(API.getPatient(id))
                .then((response) => {
                    setPatient(response.data)
                }).catch(handleError)
        }

        if (!id) {
            setPatient(PERSONAL_INFORMATION_INITIAL_STATE)
        }

    }, [id])

    const handlePatientChange = (newPatient: AddPatientType) => {
        setPatient(newPatient);
    };

    const handleOnSave = () => {
        const validPersonalInformation = validatePersonalInformation();
        const validContactPersons = validateContactPersons();

        if (validPersonalInformation && validContactPersons) {

            let patientToAdd = patient;

            if (user?.role === Role.ADMIN) {
                patientToAdd = {
                    ...patient,
                    unitId: user.unitId
                }
            }

            postReq(API.patient, patientToAdd).then((response) => {
                navigate(ROUTES.Patients)

                if (id) {
                    handleInfo("Datele pacientului au fost modificate")
                } else {
                    handleInfo("Pacientul a fost adaugat")
                }
            }).catch(handleError).finally(() => {
                setValidationPersonalInformationErrors({})
                setValidationContactPersonsErrors({})
            })
        }

    }

    const validatePersonalInformation = () => {
        let errors: { [key: string]: string } = {};

        if (!patient.firstName) errors.firstName = "Prenumele este obligatoriu";
        if (!patient.lastName) errors.lastName = "Numele este obligatoriu";

        if (!(patient.patientId.length === 13)) errors.identificationNumber = "CNP-ul nu este valid"

        if (!patient.gender) errors.gender = "Genul este obligatoriu";

        if (user?.role === Role.SUPER_ADMIN) {
            if (patient.unitId === -1) errors.unitId = "Unitatea este obligatorie";
        }
        if (!patient.dateOfBirth) errors.dateOfBirth = "Data nașterii este obligatorie";

        setValidationPersonalInformationErrors(errors);
        return Object.keys(errors).length === 0; // returns true if no errors
    };

    const validateContactPersons = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        patient?.contactPersons?.forEach((contactPerson, index) => {
            if (!contactPerson.firstName) {
                newErrors[`firstName_${index}`] = "Prenumele este necesar";
            }
            if (!contactPerson.lastName) {
                newErrors[`lastName_${index}`] = "Numele este necesar";
            }
            if (!contactPerson.email) {
                newErrors[`email_${index}`] = "Email-ul este necesar";
            } else if (!/\S+@\S+\.\S+/.test(contactPerson.email)) {
                newErrors[`email_${index}`] = "Email-ul nu este valid";
            }
            if (!contactPerson.phoneNumber) {
                newErrors[`phoneNumber_${index}`] = "Numarul de telefon este necesar";
            }
        });

        setValidationContactPersonsErrors(newErrors);

        return Object.keys(newErrors).length === 0; // returns true if no errors
    };

    return (
        <Box>
            <h1>{id ? "Editeaza date pacient" : "Adaugare pacient"}</h1>

            <Box style={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
                gap: "20px"
            }}>
                <PersonalInformationForm
                    isEdit={!!id}
                    user={user!}
                    validationErrors={validationPersonalInformationErrors}
                    handlePatientChange={handlePatientChange}
                    patient={patient}
                    units={units}
                />
                <ContactPersons
                    validationErrors={validationContactPersonsErrors}
                    handleContactPersonsChanged={(newContactPersons) => setPatient((current) => ({
                        ...current,
                        contactPersons: newContactPersons
                    }))}
                    contactPersons={patient.contactPersons || []}
                />
                <Box style={{width: "100%", display: "flex", justifyContent: "end"}}>
                    <Button variant="contained" onClick={handleOnSave}>Salveaza</Button>
                </Box>
            </Box>
        </Box>

    )
}

export default AddPatient