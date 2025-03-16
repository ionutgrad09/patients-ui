import React, {FC, useState, useEffect} from "react";
import {Box, AppBar, Toolbar, Typography, Button, TextField, Paper, Container, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {API, JWT} from "../../utils/constants";
import {ROUTES} from "../../utils/routes";
import {loginReq} from "../../utils/axios";

const Login: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem(JWT);
        if (jwt) {
            navigate(ROUTES.Patients);
        }
    }, [navigate]);

    const validateForm = () => {
        let isValid = true;

        if (!username.trim()) {
            setUsernameError("Username-ul este obligatoriu.");
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError("Parola este obligatorie.");
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError("");

        loginReq(API.login, {username, password})
            .then((response) => {
                if (response.data !== "Invalid credentials") {
                    localStorage.setItem(JWT, response.data);
                    navigate(ROUTES.Patients);
                } else {
                    setError("Username-ul sau parola nu sunt corecte.");
                }
            })
            .catch(() => {
                setError("Ceva nu a functionat. Te rog sa iei legatura cu un admin.");
            })
            .finally(() => {
                setUsernameError("");
                setPasswordError("");
                setLoading(false);
            });
    };

    const handleViewStatus = () => {
        navigate(ROUTES.ViewStatus);
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "linear-gradient(to right, #E8F4F8, #CBE7F0)",
            }}
        >
            {/* Navbar */}
            <AppBar position="static" sx={{background: "white", color: "black"}}>
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        APLICATIE PACIENTI
                    </Typography>
                    <Button variant="outlined" color="inherit" onClick={handleViewStatus}>
                        Verifica status pacient
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Login Form */}
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
                        Login
                    </Typography>

                    {/* Username Field */}
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        error={!!usernameError}
                        helperText={usernameError}
                    />

                    {/* Password Field */}
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        label="Parola"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        error={!!passwordError}
                        helperText={passwordError}
                    />

                    {/* Display Error if exists */}
                    {error && <h3 style={{color: "red"}}>{error}</h3>}

                    {/* Login Button */}
                    <Button onClick={handleLogin} variant="contained" fullWidth sx={{mt: 2}}>
                        Login
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
