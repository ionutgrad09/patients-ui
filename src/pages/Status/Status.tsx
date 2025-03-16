import React, {FC, useEffect, useState} from "react";
import {Box, AppBar, Toolbar, Typography, Button, TextField, Paper, Container, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {API, CNP, EMAIL} from "../../utils/constants";
import {ROUTES} from "../../utils/routes";
import {loginReq} from "../../utils/axios";
import SimpleDailyStatus from "./SimpleDailyStatus";
import {handleError} from "../../utils/notifications";

const Status: FC = () => {
    const [observerEmail, setObserverEmail] = useState<string>("");
    const [patientIdentifier, setPatientIdentifier] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [observerEmailError, setObserverEmailError] = useState<string>("");
    const [patientIdentifierError, setPatientIdentifierError] = useState<string>("");

    const [patientIdResponse, setPatientIdResponse] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const savedObserveEmail = sessionStorage.getItem(EMAIL);
        const savedPatientIdentifier = sessionStorage.getItem(CNP);
        
        if (savedObserveEmail && savedPatientIdentifier) {
            console.log("=== savedPatientIdentifier ===", savedPatientIdentifier);
            setPatientIdentifier(savedPatientIdentifier);
            console.log("=== savedObserveEmail ===", savedObserveEmail);
            setObserverEmail(savedObserveEmail);
        }
    }, [])

    const handleLogin = async (e: any) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError("");

        loginReq(API.observer, {observerEmail, patientIdentifier})
            .then((response) => {
                if (response.data !== "Invalid credentials") {
                    sessionStorage.setItem(CNP, patientIdentifier)
                    sessionStorage.setItem(EMAIL, observerEmail)
                    setPatientIdResponse(response.data.patientId);
                } else {
                    setError("Email-ul sau CNP-ul nu sunt corecte.");
                }
            })
            .catch(handleError)
            .finally(() => {
                setLoading(false);
                setObserverEmailError("");
                setPatientIdentifierError("");
            });
    };

    const validateForm = () => {
        let isValid = true;

        if (!observerEmail.trim()) {
            setObserverEmailError("Email-ul este obligatoriu.");
            isValid = false;
        }

        if (!patientIdentifier.trim()) {
            setPatientIdentifier("CNP-ul pacientului este obligatoriu.");
            isValid = false;
        }

        return isValid;
    };

    const handleLoginRedirect = () => {
        navigate(ROUTES.Login);
    }

    return (
        <Box
            sx={{
                paddingBottom: "50px",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: patientIdResponse ? "#f1f1f1": "linear-gradient(to right, #E8F4F8, #CBE7F0)",
            }}
        >
            <AppBar position="static" sx={{background: "white", color: "black"}}>
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        APLICATIE PACIENTI
                    </Typography>
                    <Button variant="outlined" color="inherit" onClick={handleLoginRedirect}>
                        LOGIN
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Login Form */}
            {!patientIdResponse ? (
                <Container style={{width: "700px", marginTop: "100px"}}>
                    <Paper
                        elevation={6}
                        sx={{
                            padding: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            background: "white",
                        }}
                    >
                        {loading && <CircularProgress style={{marginBottom: "30px"}}/>}
                        <Typography variant="h5" gutterBottom>
                            Verificare status pacient
                        </Typography>

                        <TextField
                            onChange={(e) => setObserverEmail(e.target.value)}
                            label="Email-ul tau"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={observerEmail}
                            error={!!observerEmailError}
                            helperText={observerEmailError}
                        />

                        {/* Password Field */}
                        <TextField
                            onChange={(e) => setPatientIdentifier(e.target.value)}
                            label="CNP Pacient"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientIdentifier}
                            required
                            error={!!patientIdentifierError}
                            helperText={patientIdentifierError}
                        />

                        {/* Display Error if exists */}
                        {error && <h3 style={{color: "red"}}>{error}</h3>}

                        {/* Login Button */}
                        <Button onClick={handleLogin} variant="contained" fullWidth sx={{mt: 2}}>
                            Verifica
                        </Button>
                    </Paper>
                </Container>
            ) : <SimpleDailyStatus id={patientIdResponse} observerEmail={observerEmail}/>
            }
        </Box>
    );
};

export default Status;
