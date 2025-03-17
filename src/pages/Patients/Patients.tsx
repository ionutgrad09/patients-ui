import React, {FC, useCallback, useContext, useEffect, useState} from 'react'
import {Patient, Role} from "../../utils/types";
import {
    Avatar,
    Box,
    Button, CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../utils/routes";
import {deleteReq, getReq} from "../../utils/axios";
import {API} from "../../utils/constants";
import {AuthContext} from "../../contexts/AuthProvider";
import {timestampDateToString} from "../../utils/time";
import {handleError, handleInfo} from "../../utils/notifications";




const Patients: FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchData = useCallback(() => {
        if (user) {
            getReq(API.getAllPatients(user.unitId || -1)).then((response) => {
                setPatients(response.data)
                setLoading(false);
            }).catch(handleError)
        }
    }, [user])
    
    useEffect(() => {
        if (user) {
            setLoading(true)
            fetchData()
        }
    }, [fetchData, user])

    const handlePatientDelete = (patientId: string) => {
        setLoading(true)
        deleteReq(API.deletePatient(patientId)).then(() => {
            handleInfo(`Pacientul cu CNP: ${patientId} a fost sters`)
            fetchData()
            setLoading(false)
        }).catch(handleError)
    }

    return (
        <Box>
            <h1>Pacienti</h1>
            {loading && <CircularProgress size={75} style={{position: "absolute", top: "45%", left: "50%"}}/>}
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nume</b></TableCell>
                            <TableCell align="center"><b>CNP</b></TableCell>
                            <TableCell align="center"><b>Data nasterii</b></TableCell>
                            <TableCell align="center"><b>Sex</b></TableCell>
                            {user?.role === Role.SUPER_ADMIN && <TableCell align="center"><b>ID Unitate</b></TableCell>}
                            <TableCell align="center"><b>Actiuni</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((row) => (
                            <TableRow
                                key={row.patientId}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <Box style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                        <Avatar>{row.firstName[0] + row.lastName[0]}</Avatar>
                                        {row.firstName + " " + row.lastName}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{row.patientId}</TableCell>
                                <TableCell align="center">{timestampDateToString(row.dateOfBirth)}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                {user?.role === Role.SUPER_ADMIN &&
                                    <TableCell align="center">{row.unitId}</TableCell>}
                                <TableCell align="center">
                                    {
                                        user?.role !== Role.SUPER_ADMIN && <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => navigate(ROUTES.PatientPathCreator(row.patientId))}
                                        >
                                            Vizualizare
                                        </Button>
                                    }
                                    {user?.role !== Role.MODERATOR &&
                                        <>
                                            <Button
                                                style={{marginLeft: "10px"}}
                                                variant="contained"
                                                onClick={() => navigate(ROUTES.EditPatientCreator(row.patientId))}>Editeaza</Button>
                                            <Button
                                                style={{marginLeft: "10px"}}
                                                variant="contained"
                                                color="error"
                                                onClick={() => handlePatientDelete(row.patientId)}>Sterge</Button>
                                        </>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}

export default Patients;