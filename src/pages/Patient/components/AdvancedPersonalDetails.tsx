import {Box, Divider, Tab, Tabs} from "@mui/material";
import React, {FC} from "react";
import {Patient} from "../../../utils/types";

interface Props {
    patient: Patient;
}

const AdvancedPersonalDetails: FC<Props> = ({patient}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)"
        }}>
            <Box style={{width: "100%"}}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange}>
                    <Tab label={<b>Detalii</b>} id="0"/>
                    <Tab label={<b>Recomandari</b>} id="0"/>
                    <Tab label={<b>Contact</b>} id="1"/>
                </Tabs>
            </Box>
            {value === 0 &&
                <Box style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "start",
                    maxHeight: "500px",
                    overflowY: "auto"
                }}>
                    <h3>Suferind de:</h3>
                    <span>{patient.diseases}</span>
                    <Divider/>
                    <h3>Mentiuni:</h3>
                    {patient.mentions?.length > 0 ? patient.mentions.split("\n").map((line, index) => (
                        <span
                            style={{
                                display: "block", // Ensures each line behaves like a paragraph
                                wordBreak: "break-word", // Breaks long words if needed
                                whiteSpace: "pre-wrap", // Preserves \n and wraps correctly
                                overflowWrap: "break-word", // Ensures wrapping happens
                            }} key={index}>
                                {line}
                            </span>
                    )) : <Box>Nu exista nicio mentiune.</Box>}
                </Box>
            }

            {value === 1 &&
                <Box style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "start",
                    maxHeight: "500px",
                    overflowY: "auto"
                }}>
                    <h3>Recomandari:</h3>
                    {patient.recommendation?.length > 0 ? patient.recommendation.split("\n").map((line, index) => (
                        <span
                            style={{
                                display: "block", // Ensures each line behaves like a paragraph
                                wordBreak: "break-word", // Breaks long words if needed
                                whiteSpace: "pre-wrap", // Preserves \n and wraps correctly
                                overflowWrap: "break-word", // Ensures wrapping happens
                            }} key={index}>
                                {line}
                            </span>
                    )): <Box>Nu exista nicio recomandare.</Box>}
                </Box>
            }

            {value === 2 &&
                <Box style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    justifyContent: "start",
                    maxHeight: "500px",
                    overflowY: "auto"
                }}>
                    <h3>Persoane de contact:</h3>
                    {patient.contactPersons ? patient.contactPersons?.map((contact, index) => (
                        <>
                            <Box key={index}>
                                <b>Nume</b>: {contact.firstName + " " + contact.lastName}
                            </Box>
                            <Box key={index}>
                                <b>Email</b>b: {contact.email}
                            </Box>
                            <Box key={index}>
                                <b>Numar telefon</b>: {contact.phoneNumber}
                            </Box>

                            <Divider/>
                        </>
                    )): <Box>Nu exista persoane de contact.</Box>}
                </Box>
            }
        </Box>
    )
}

export default AdvancedPersonalDetails;