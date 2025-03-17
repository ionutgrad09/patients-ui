import React, {FC, useCallback, useContext, useEffect, useState} from 'react'
import {Role, Unit, User} from "../../utils/types";
import {
    Box, Button,
    Chip, CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {deleteReq, getReq, postReq} from "../../utils/axios";
import {API} from "../../utils/constants";
import {AuthContext} from "../../contexts/AuthProvider";
import AddUserModal from "./components/AddUserModal";
import {handleError, handleInfo} from "../../utils/notifications";


export type ModifyUserType = User & { password?: string };

const emptyUser: ModifyUserType = {
    username: "",
    firstName: "",
    password: "",
    lastName: "",
    phoneNumber: "",
    role: Role.MODERATOR,
    unitId: -1,
    permissions: []
}


const Users: FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [userToModify, setUserToModify] = useState<ModifyUserType>(emptyUser);
    const [users, setUsers] = useState<User[]>([]);
    const [units, setUnits] = useState<Unit[] | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {user} = useContext(AuthContext);

    const getUsers = useCallback(() => {
        if (!user) {
            return
        }

        const unitId = user.role === Role.ADMIN ? user.unitId : null

        setLoading(true)
        getReq(API.getAllUsers(unitId)).then((response) => {
            setUsers(response.data)
            setLoading(false)
        }).catch(handleError)
    }, [user])

    const fetchData = useCallback(() => {
        getUsers();

        if (user?.role === Role.SUPER_ADMIN) {
            getUnits();
        }
    }, [getUsers, user?.role])

    useEffect(() => {
        fetchData();
    }, [fetchData, user])


    useEffect(() => {
        const isEditMode = !!users.filter(u => u.username === userToModify.username).length;

        setIsEdit(isEditMode)

    }, [userToModify, users])


    const getUnits = () => {
        getReq(API.getAllUnits).then((response) => {
            setUnits(response.data)
        }).catch(handleError)
    }

    const handleAddUser = () => {
        if (validateForm()) {
            let enhancedUser = userToModify;

            if (user?.role === Role.ADMIN) {
                enhancedUser = {
                    ...enhancedUser,
                    unitId: user.unitId
                }
            }

            setLoading(true)
            postReq(API.user, enhancedUser).then(() => {
                setUserToModify(emptyUser)
                setOpen(false)
                getUsers();
                setLoading(false);
                handleInfo("User-ul a fost creeat");
            }).catch(handleError)
        }

    }

    const validateForm = (): boolean => {
        const errors: { [key: string]: string } = {};

        if (!isEdit && !userToModify.username) errors.username = 'Numele de utilizator este obligatoriu';
        if (!isEdit && !userToModify.password) errors.password = 'Parola este obligatorie';
        if (!userToModify.firstName) errors.firstName = 'Prenumele este obligatoriu';
        if (!userToModify.lastName) errors.lastName = 'Numele de familie este obligatoriu';
        if (!userToModify.phoneNumber) errors.phoneNumber = 'Numărul de telefon este obligatoriu';
        if (!userToModify.role) errors.role = 'Rolul este obligatoriu';
        if (user?.role === Role.SUPER_ADMIN && userToModify.unitId === -1) errors.unitId = 'Unitatea este obligatorie';

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleEditClicked = (userToEdit: User) => {
        setUserToModify(userToEdit);
        setOpen(true);
    };

    const handleDeleteClicked = (username: string) => {
        deleteReq(API.deleteUser(username)).then((response) => {
            fetchData()
            handleInfo("User-ul a fost sters.")
        }).catch(handleError);
    };

    const handleModalClosed = () => {
        setOpen(false)
        setUserToModify(emptyUser)
    };


    return (
        <Box>
            {loading && <CircularProgress size={75} style={{position: "absolute", top: "45%", left: "50%"}}/>}
            {open && (
                <AddUserModal
                    loading={loading}
                    isEdit={isEdit}
                    validationErrors={validationErrors}
                    handleSave={handleAddUser}
                    userToModify={userToModify}
                    units={units}
                    setUserToModify={(changedUser: ModifyUserType) => setUserToModify(changedUser)}
                    open={open}
                    closeModal={handleModalClosed}
                />
            )}
            <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Utilizatori</h1>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}>
                        Adauga Utilizator
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Username</b></TableCell>
                            <TableCell align="center"><b>Nume</b></TableCell>
                            <TableCell align="center"><b>Numar de Telefon</b></TableCell>
                            <TableCell align="center"><b>Rol</b></TableCell>
                            {user?.role === Role.SUPER_ADMIN && <TableCell align="center"><b>ID Unitate</b></TableCell>}
                            <TableCell align="center"><b>Actiuni</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.username}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>
                                    <span style={{marginRight: "10px"}}>{row.username}</span>
                                    {/*{user?.username === row.username && <Chip label="tu" color="error"/> }*/}
                                </TableCell>
                                <TableCell align="center">{row.firstName + " " + row.lastName}</TableCell>
                                <TableCell align="center">{row.phoneNumber || "-"}</TableCell>
                                <TableCell align="center">
                                    <Chip variant="outlined" label={row.role}
                                          color={row.role === Role.MODERATOR ? "primary" : "warning"}/>
                                </TableCell>
                                {user?.role === Role.SUPER_ADMIN && <TableCell>{row.unitId}</TableCell>}
                                <TableCell align="center">
                                    <Button variant="contained"
                                            onClick={() => handleEditClicked(row)}>Editeaza</Button>
                                    {
                                        user?.username !== row.username &&
                                        <Button style={{marginLeft: "10px"}} color="error" variant="contained"
                                                onClick={() => handleDeleteClicked(row.username)}>Sterge</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}

export default Users;