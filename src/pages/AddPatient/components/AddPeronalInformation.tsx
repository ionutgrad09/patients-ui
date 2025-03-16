import { FC } from "react";
import {Box, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {AddPatientType} from "../AddPatient";
import {Role, Unit, User} from "../../../utils/types";

interface Props {
    handlePatientChange: (newPatient: AddPatientType) => void;
    patient: AddPatientType;
    units: Unit[];
    validationErrors: { [key: string]: string };
    user: User,
    isEdit: boolean
}

const PersonalInformationForm: FC<Props> = ({ user, handlePatientChange, patient, units, validationErrors, isEdit }) => {
    const {
        lastName,
        firstName,
        gender,
        patientId,
        mentions,
        diseases,
        recommendation,
        dateOfBirth,
        unitId
    } = patient;

    const handleInputChange = (field: string, value: any) => {
        handlePatientChange({ ...patient, [field]: value });
    };

    return (
        <Box style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
            <h3>Informatii personale:</h3>
            <Box style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                {/* Name fields */}
                <Box style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>
                    <TextField
                        style={{ flex: 1 }}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        value={lastName}
                        label="Nume"
                        error={!!validationErrors.lastName}
                        helperText={validationErrors.lastName}
                    />
                    <TextField
                        style={{ flex: 1 }}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        value={firstName}
                        label="Prenume"
                        error={!!validationErrors.firstName}
                        helperText={validationErrors.firstName}
                    />
                </Box>

                {/* CNP, Gender, and Unit fields */}
                <Box style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>
                    <TextField
                        disabled={isEdit}
                        style={{ flex: 1 }}
                        onChange={(e) => handleInputChange("patientId", e.target.value)}
                        value={patientId}
                        label="CNP"
                        error={!!validationErrors.identificationNumber}
                        helperText={validationErrors.identificationNumber}
                    />
                    <FormControl fullWidth style={{ flex: 1 }} error={!!validationErrors?.gender}>
                        <InputLabel>Sex</InputLabel>
                        <Select
                            value={gender}
                            label="Sex"
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                            error={!!validationErrors.gender}
                        >
                            <MenuItem value="Barbat">Barbat</MenuItem>
                            <MenuItem value="Femeie">Femeie</MenuItem>
                        </Select>
                        {validationErrors?.gender && <FormHelperText>{validationErrors.gender}</FormHelperText>}
                    </FormControl>
                    {user.role === Role.SUPER_ADMIN && <FormControl fullWidth style={{ flex: 1 }} error={!!validationErrors?.unitId}>
                        <InputLabel>Unitate</InputLabel>
                        <Select
                            value={unitId !== -1 ? unitId : null}
                            label="Unitate"
                            onChange={(e) => handleInputChange("unitId", e.target.value)}
                            error={!!validationErrors.unitId}
                        >
                            {units.map((unit) => (
                                <MenuItem key={unit.id} value={unit.id}>
                                    {unit.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {validationErrors?.unitId && <FormHelperText>{validationErrors.unitId}</FormHelperText>}
                    </FormControl>}
                </Box>

                {/* Date of Birth and Diseases fields */}
                <Box style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>
                    <DatePicker
                        value={dateOfBirth !== 0 ? dayjs(dayjs.unix(dateOfBirth).format("YYYY-MM-DD")) : null}
                        sx={{ flex: 1 }}
                        format="DD/MM/YYYY"
                        label="Data Nasterii"
                        onChange={(e) => handleInputChange("dateOfBirth", e?.unix() || 0)}
                        slotProps={{
                            textField: {
                                error: !!validationErrors.dateOfBirth,
                                helperText: validationErrors.dateOfBirth,
                            },
                        }}
                    />
                    <TextField
                        style={{ flex: 1 }}
                        onChange={(e) => handleInputChange("diseases", e.target.value)}
                        value={diseases}
                        label="Boli"
                        error={!!validationErrors.diseases}
                        helperText={validationErrors.diseases}
                    />
                </Box>

                {/* Mentions and Recommendation fields */}
                <Box style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>
                    <TextField
                        style={{ flex: 1 }}
                        value={mentions}
                        rows={6}
                        multiline
                        label="Mentiuni"
                        onChange={(e) => handleInputChange("mentions", e.target.value)}
                        error={!!validationErrors.mentions}
                        helperText={validationErrors.mentions}
                    />
                    <TextField
                        style={{ flex: 1 }}
                        rows={6}
                        multiline
                        value={recommendation}
                        label="Recomandari"
                        onChange={(e) => handleInputChange("recommendation", e.target.value)}
                        error={!!validationErrors.recommendation}
                        helperText={validationErrors.recommendation}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PersonalInformationForm;
