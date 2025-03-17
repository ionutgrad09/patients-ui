import React, {FC, useEffect, useState} from 'react'
import {DailyStatus, Patient} from "../../utils/types";
import {Box, CircularProgress, Skeleton} from "@mui/material";
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

const getDailyStatus = async (id: string, date: number, observerEmail: string) => {
    return getReq(API.getDailyStatusForObserver(id, date, observerEmail))
}

const SimpleDailyStatus: FC<Props> = ({id, observerEmail}) => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const [dailyStatus, setDailyStatus] = useState<DailyStatus | null>(null)
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        if (id) {
            Promise.all([getReq(API.getPatientForObserver(id, observerEmail)), getDailyStatus(id, dayjs().startOf("day").unix() * 1000, observerEmail)])
                .then(([patientResponse, dailyStatusResponse]) => {
                    setPatient(patientResponse.data)
                    setDailyStatus(dailyStatusResponse.data)
                }).catch(handleError).finally(() => {
                setLoading(false)
            });
        }
    }, [id, observerEmail])

    const handleDateChanged = (timestamp: number) => {
        setLoading(true)
        getDailyStatus(id!, timestamp, observerEmail)
            .then(response => {
                setDailyStatus(response.data);
            }).catch(handleError).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Box style={{display: "flex", flexDirection: "column", width: "80%"}}>
            <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Pacient</h1>
            </Box>
            {loading && <CircularProgress size={75} style={{position: "absolute", top: "45%", left: "50%"}}/>}
            {!patient || !dailyStatus ? <Box>
                    <Skeleton animation="wave" height={150}/>
                    <Skeleton animation="wave" height={150}/>
                    <Skeleton animation="wave" height={150}/>
                    <Skeleton animation="wave" height={150}/>
                </Box> :
                <Box style={{display: "flex", flexDirection: "row", gap: "25px"}}>
                    <Box style={{display: "flex", flexDirection: "column", width: "50%", gap: "20px"}}>
                        <PersonalDetails patient={patient}/>
                        <AdvancedPersonalDetails patient={patient}/>
                    </Box>
                    <DailyStatusDetails
                        dailyStatus={dailyStatus}
                        readonly={true}
                        validationErrors={{}}
                        handleDateChanged={handleDateChanged}
                        updateDailyStatus={() => {}}
                    />
                </Box>}
        </Box>
    )
}

export default SimpleDailyStatus