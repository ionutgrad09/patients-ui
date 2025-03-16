import {Box, Button, TextField} from "@mui/material";
import React, {FC} from "react";
import {ContactPerson} from "../../../utils/types";

interface Props {
    handleContactPersonsChanged: (newContactPersons: ContactPerson[]) => void,
    contactPersons: ContactPerson[],
    validationErrors: { [key: string]: string };
}

const ContactPersons: FC<Props> = ({ handleContactPersonsChanged, contactPersons, validationErrors }) => {
    const handleAddContactPerson = () => {
        handleContactPersonsChanged([
            ...contactPersons,
            { firstName: "", lastName: "", email: "", phoneNumber: "" }
        ]);
    };

    const handleContactPersonChange = (index: number, fieldName: string, value: string) => {
        const updatedContactPersons = [...contactPersons];

        updatedContactPersons[index][fieldName as keyof ContactPerson] = value;
        handleContactPersonsChanged(updatedContactPersons);
    };

    const handleDelete = (index: number) => {
        const updatedContactPersons = contactPersons.filter((_, i) => i !== index);
        handleContactPersonsChanged(updatedContactPersons);
    };

    return (
        <Box style={{ width: "100%" }}>
            <h3>Persoane de contact:</h3>
            {contactPersons.map((contactPerson, index) => (
                <Box key={index} style={{ width: "100%", display: "flex", gap: "20px", marginTop: "20px" }}>
                    <TextField
                        style={{ flex: 1 }}
                        label="Nume"
                        value={contactPerson.lastName}
                        onChange={(e) => handleContactPersonChange(index, "lastName", e.target.value)}
                        error={!!validationErrors[`lastName_${index}`]}
                        helperText={validationErrors[`lastName_${index}`]}
                    />
                    <TextField
                        style={{ flex: 1 }}
                        label="Prenume"
                        value={contactPerson.firstName}
                        onChange={(e) => handleContactPersonChange(index, "firstName", e.target.value)}
                        error={!!validationErrors[`firstName_${index}`]}
                        helperText={validationErrors[`firstName_${index}`]}
                    />
                    <TextField
                        style={{ flex: 1 }}
                        label="Email"
                        value={contactPerson.email}
                        onChange={(e) => handleContactPersonChange(index, "email", e.target.value)}
                        error={!!validationErrors[`email_${index}`]}
                        helperText={validationErrors[`email_${index}`]}
                    />
                    <TextField
                        style={{ flex: 1 }}
                        label="Numar telefon"
                        value={contactPerson.phoneNumber}
                        onChange={(e) => handleContactPersonChange(index, "phoneNumber", e.target.value)}
                        error={!!validationErrors[`phoneNumber_${index}`]}
                        helperText={validationErrors[`phoneNumber_${index}`]}
                    />
                    <Button style={{height: "55px"}} variant="contained" color="error" onClick={() => handleDelete(index)}>Sterge</Button>
                </Box>
            ))}
            <Button style={{ marginTop: "20px", width: "100%" }} variant="outlined" onClick={handleAddContactPerson}>
                Adauga persoana de contact
            </Button>
        </Box>
    );
};

export default ContactPersons