import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {Role, Unit} from "../../../utils/types";
import React, {FC} from "react";
import {ModifyUserType} from "../Users";

interface Props {
    closeModal: () => void,
    open: boolean,
    userToModify: ModifyUserType,
    setUserToModify: (newAddUser: ModifyUserType) => void,
    units: Unit[] | null,
    handleSave: () => void,
    validationErrors: { [key: string]: string },
    isEdit: boolean
}

const AddUserModal: FC<Props> = ({
                                     closeModal,
                                     open,
                                     userToModify,
                                     setUserToModify,
                                     units,
                                     handleSave,
                                     validationErrors,
                                     isEdit
                                 }) => {

    const handleFieldChanged = (field: string, value: any) => {
        setUserToModify({...userToModify, [field]: value});
    };

    const handleUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => handleFieldChanged("username", e.target.value);
    const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => handleFieldChanged("password", e.target.value);
    const handleFirstNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => handleFieldChanged("firstName", e.target.value);
    const handleLastNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => handleFieldChanged("lastName", e.target.value);
    const handlePhoneNumberChanged = (e: React.ChangeEvent<HTMLInputElement>) => handleFieldChanged("phoneNumber", e.target.value);
    const handleRoleChanged = (e: SelectChangeEvent<string | null>) => handleFieldChanged("role", e.target.value === Role.ADMIN ? Role.ADMIN : Role.MODERATOR);
    const handleUnitChanged = (e: SelectChangeEvent<number | null>) => handleFieldChanged("unitId", e.target.value);

    return (
        <Dialog onClose={closeModal} open={open}>
            <DialogTitle><b>Adaugare Utilizator</b></DialogTitle>
            <Box style={{
                width: "500px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "30px"
            }}>
                <TextField
                    required
                    disabled={isEdit}
                    style={{width: "100%"}}
                    label="Username"
                    onChange={handleUsernameChanged}
                    value={userToModify.username}
                    error={!!validationErrors.username}
                    helperText={validationErrors.username}
                />
                {!isEdit && <TextField
                    required
                    style={{width: "100%"}}
                    label="Parola"
                    type="password"
                    onChange={handlePasswordChanged}
                    value={userToModify.password}
                    error={!!validationErrors.password}
                    helperText={validationErrors.password}
                />}
                <TextField
                    required
                    style={{width: "100%"}}
                    label="Prenume"
                    onChange={handleFirstNameChanged}
                    value={userToModify.firstName}
                    error={!!validationErrors.firstName}
                    helperText={validationErrors.firstName}
                />
                <TextField
                    required
                    style={{width: "100%"}}
                    label="Nume"
                    onChange={handleLastNameChanged}
                    value={userToModify.lastName}
                    error={!!validationErrors.lastName}
                    helperText={validationErrors.lastName}
                />
                <TextField
                    required
                    style={{width: "100%"}}
                    label="Numar de telefon"
                    onChange={handlePhoneNumberChanged}
                    value={userToModify.phoneNumber}
                    error={!!validationErrors.phoneNumber}
                    helperText={validationErrors.phoneNumber}
                />
                <FormControl fullWidth>
                    <InputLabel>Rol</InputLabel>
                    <Select
                        value={userToModify.role}
                        label="Rol"
                        onChange={handleRoleChanged}
                    >
                        <MenuItem value={Role.MODERATOR}>Moderator</MenuItem>
                        <MenuItem value={Role.ADMIN}>Admin</MenuItem>
                    </Select>
                    {validationErrors.role && <FormHelperText error>{validationErrors.role}</FormHelperText>}
                </FormControl>
                {units != null && <FormControl fullWidth>
                    <InputLabel>Unitate</InputLabel>
                    <Select
                        value={userToModify.unitId !== -1 ? userToModify.unitId : null}
                        label="Unitate"
                        onChange={handleUnitChanged}
                    >
                        {units.map((unit) => {
                            return <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                        })}
                    </Select>
                    {validationErrors.unitId && <FormHelperText error>{validationErrors.unitId}</FormHelperText>}
                </FormControl>}
            </Box>
            <DialogActions>
                <Button onClick={closeModal} variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained">
                    Salveaza
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default AddUserModal;