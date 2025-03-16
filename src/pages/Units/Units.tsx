import React, {FC, useEffect, useState} from 'react'
import {Unit} from "../../utils/types";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {getReq, postReq} from "../../utils/axios";
import {API} from "../../utils/constants";
import UnitForm from "./components/UnitForm";
import {handleError} from "../../utils/notifications";


const Units: FC = () => {
    const [unitId, setUnitId] = useState<number | null>(null);
    const [unitName, setUnitName] = useState<string>("");
    const [addUnitOpened, setAddUnitOpened] = useState<boolean>(false);
    const [units, setUnits] = useState<Unit[]>([]);

    useEffect(() => {
        getAllUnits();
    }, [])


    const getAllUnits = () => {
        getReq(API.getAllUnits).then((response) => {
            setUnits(response?.data || [])
        })
    };

    const handleAddUnit = () => {
        const body = {
            name: unitName,
            ...(unitId && {id: unitId})
        }

        postReq(API.unit, body).then(() => {
            setUnitId(null)
            setUnitName("")
            setAddUnitOpened(false)
            getAllUnits();
        }).catch(handleError)
    }


    const handleClose = () =>{
        setUnitId(null)
        setUnitName("")
        setAddUnitOpened(false)
    }

    const handleEditUnit = (unitName: string, id: number) => {
        setUnitName(unitName);
        setUnitId(id);
        setAddUnitOpened(true);
    }

    return (
        <Box>
            {addUnitOpened &&
                <UnitForm
                    unitId={unitId}
                    closeModal={handleClose}
                    modalOpened={addUnitOpened}
                    handleSave={handleAddUnit}
                    unitName={unitName}
                    setUnitName={setUnitName}
                />
            }
            <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Unitati</h1>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => setAddUnitOpened(true)}>
                        Adauga Unitate
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>ID</b></TableCell>
                            <TableCell align="center"><b>Nume</b></TableCell>
                            <TableCell align="center"><b>Actiuni</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {units.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" onClick={() => handleEditUnit(row.name, row.id)}>Editeaza</Button>
                                    {/*<Button style={{marginLeft: "10px"}} variant="contained"*/}
                                    {/*        color="error">Sterge</Button>*/}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}

export default Units;