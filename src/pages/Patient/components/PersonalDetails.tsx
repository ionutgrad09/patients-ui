import React, {FC} from 'react';
import {Avatar, Box, Skeleton} from "@mui/material";
import {Patient} from "../../../utils/types";
import {timestampDateToString} from "../../../utils/time";

interface PersonalInformationProps {
    patient: Patient | null;
}

const PersonalDetails: FC<PersonalInformationProps> = ({patient}) => {

    return (
        !patient ?
            <Skeleton style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                backgroundColor: "white",
                alignItems: "center",
                borderRadius: "5px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)"
            }}/>
            :
            <Box style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                backgroundColor: "white",
                alignItems: "center",
                borderRadius: "5px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)"
            }}>
                <h2 style={{zIndex: 1,}}>{patient.firstName + " " + patient.lastName}</h2>
                <Avatar sx={{zIndex: 1, height: '150px', width: '150px'}}>
                    <h1>{patient.firstName[0] + patient.lastName[0]}</h1></Avatar>
                <Box style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "30px"
                }}>
                    <Box style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "5px"}}>
                        <div>CNP</div>
                        <div><b>{patient.patientId}</b></div>
                    </Box>
                    <Box style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "5px"}}>
                        <div>Sex</div>
                        <div><b>{patient.gender}</b></div>
                    </Box>
                    <Box style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "5px"}}>
                        <div>Data Nasterii</div>
                        <div><b>{timestampDateToString(patient.dateOfBirth)}</b></div>
                    </Box>
                </Box>
                <Box style={{
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    height: "180px",
                    background: "linear-gradient(to right, #E8F4F8, #CBE7F0)"
                }}/>
            </Box>
    )
}

export default PersonalDetails