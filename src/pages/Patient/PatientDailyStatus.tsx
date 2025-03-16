import React, {FC, useContext, useEffect, useState} from 'react'
import PersonalDetails from "./components/PersonalDetails";
import {useParams} from "react-router-dom";
import {DailyStatus, Patient} from "../../utils/types";
import {Box, Button} from "@mui/material";
import AdvancedPersonalDetails from "./components/AdvancedPersonalDetails";
import DailyStatusDetails, {ValidationErrors} from "./components/DailyStatusDetails";
import {getReq, postReq} from "../../utils/axios";
import {API} from "../../utils/constants";
import dayjs from "dayjs";
import {AuthContext} from "../../contexts/AuthProvider";
import {handleError, handleInfo} from "../../utils/notifications";


const PatientDailyStatus: FC = () => {
    const [readonly, setReadonly] = useState<boolean>(false)
    const [dirtyForm, setDirtyForm] = useState<boolean>(false)
    const [patient, setPatient] = useState<Patient | null>(null)
    const [dailyStatus, setDailyStatus] = useState<DailyStatus | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDailyStatus, setLoadingDailyStatus] = useState<boolean>(false)
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const {user} = useContext(AuthContext);

    const {id} = useParams()

    useEffect(() => {
        if (id) {
            Promise.all([getReq(API.getPatient(id)), getDailyStatus(id, dayjs().startOf("day").unix() * 1000)])
                .then(([patientResponse, dailyStatusResponse]) => {
                    setPatient(patientResponse.data)
                    setDailyStatus(dailyStatusResponse.data)
                }).catch((e) => {
            }).finally(() => {
                setLoading(false)
            });
        }
    }, [id])

    useEffect(() => {
        if (dailyStatus) {
            const isDateFromThePast = dayjs().startOf("day").isAfter(dayjs(dailyStatus?.timestamp).startOf("day"));

            const isNotTheAssignedUser = dailyStatus.assignedTo ? dailyStatus.assignedTo !== user?.username : false;

            setReadonly(isDateFromThePast || isNotTheAssignedUser)
        }
    }, [dailyStatus, user])

    const getDailyStatus = async (id: string, date: number) => {
        return getReq(API.getDailyStatus(id, date))
    }

    const handleDateChanged = (timestamp: number) => {
        setLoadingDailyStatus(true)
        getDailyStatus(id!, timestamp)
            .then(response => {
                setDailyStatus(response.data);
            }).catch(handleError).finally(() => {
            setLoadingDailyStatus(false)
        })
    }

    const handleUpdateDailyStatus = () => {
        if (validate()) {
            setLoadingDailyStatus(true);
            postReq(API.updateDailyStatus, dailyStatus!)
                .then((response) => {
                    setDailyStatus(response.data)
                    setDirtyForm(false)
                    handleInfo("Fisa pacientului a fost salvata")
                }).catch(handleError).finally(() => {
                    setLoadingDailyStatus(false)
                }
            )
        }
    }

    const dailyStatusChange = (newDailyStatus: DailyStatus) => {
        setDirtyForm(true);
        setDailyStatus(newDailyStatus);

    }

    const validate = () => {
        const errors: ValidationErrors = {};
        if (dailyStatus) {
            if (!dailyStatus.healthCondition) errors.healthCondition = "Starea de sănătate este obligatorie.";
            if (!dailyStatus.medication) errors.medication = "Medicația este obligatorie.";
            if (!dailyStatus.meals) errors.meals = "Alimentația este obligatorie.";
            if (!dailyStatus.activities) errors.activities = "Activitățile sunt obligatorii.";
            if (!dailyStatus.mentions) errors.mentions = "Mențiunile sunt obligatorii.";

            setValidationErrors(errors);
            return Object.keys(errors).length === 0;
        }

    };

    if (!id) {
        return <h1>Pacientul nu a putut fi gasit</h1>
    }

    if (loading || !patient || !dailyStatus) {
        return null;
    }


    return (
        <Box style={{display: "flex", flexDirection: "column"}}>
            <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Pacient</h1>
                <Box>
                    <Button
                        variant="contained"
                        disabled={readonly || !dirtyForm}
                        onClick={handleUpdateDailyStatus}>
                        Salveaza
                    </Button>
                </Box>
            </Box>
            <Box style={{display: "flex", flexDirection: "row", gap: "25px"}}>
                <Box style={{display: "flex", flexDirection: "column", width: "50%", gap: "20px"}}>
                    <PersonalDetails patient={patient}/>
                    <AdvancedPersonalDetails patient={patient}/>
                </Box>
                <DailyStatusDetails
                    dailyStatus={dailyStatus}
                    readonly={readonly}
                    validationErrors={validationErrors}
                    handleDateChanged={handleDateChanged}
                    updateDailyStatus={dailyStatusChange}
                    loading={loadingDailyStatus}
                />
            </Box>
        </Box>
    )
}

export default PatientDailyStatus