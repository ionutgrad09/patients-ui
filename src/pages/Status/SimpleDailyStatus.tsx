import React, {FC, useEffect, useState} from 'react'
import {DailyStatus, Patient} from "../../utils/types";
import {Box} from "@mui/material";
import {getReq} from "../../utils/axios";
import {API} from "../../utils/constants";
import dayjs from "dayjs";
import PersonalDetails from "../Patient/components/PersonalDetails";
import AdvancedPersonalDetails from "../Patient/components/AdvancedPersonalDetails";
import DailyStatusDetails from "../Patient/components/DailyStatusDetails";
import {handleError} from "../../utils/notifications";

interface Props {
    id: string;
    observerEmail: string;
}

const SimpleDailyStatus: FC<Props> = ({id, observerEmail}) => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const [dailyStatus, setDailyStatus] = useState<DailyStatus | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDailyStatus, setLoadingDailyStatus] = useState<boolean>(false)

    useEffect(() => {
        if (id) {
            Promise.all([getReq(API.getPatientForObserver(id, observerEmail)), getDailyStatus(id, dayjs().startOf("day").unix() * 1000)])
                .then(([patientResponse, dailyStatusResponse]) => {
                    setPatient(patientResponse.data)
                    setDailyStatus(dailyStatusResponse.data)
                }).catch(handleError).finally(() => {
                setLoading(false)
            });
        }
    }, [id])

    const getDailyStatus = async (id: string, date: number) => {
        return getReq(API.getDailyStatusForObserver(id, date, observerEmail))
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


    if (loading || !patient || !dailyStatus) {
        return null;
    }

    return (
        <Box style={{display: "flex", flexDirection: "column", width: "80%"}}>
            <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Pacient</h1>
            </Box>
            <Box style={{display: "flex", flexDirection: "row", gap: "25px"}}>
                <Box style={{display: "flex", flexDirection: "column", width: "50%", gap: "20px"}}>
                    <PersonalDetails patient={patient}/>
                    <AdvancedPersonalDetails patient={patient}/>
                </Box>
                <DailyStatusDetails
                    isObserver
                    dailyStatus={dailyStatus}
                    readonly
                    validationErrors={{}}
                    handleDateChanged={handleDateChanged}
                    updateDailyStatus={() => {
                    }}
                    loading={loadingDailyStatus}
                />
            </Box>
        </Box>
    )
}

export default SimpleDailyStatus