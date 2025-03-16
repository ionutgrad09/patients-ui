import React, {useState} from "react";

import { Outlet } from 'react-router-dom';
import {AuthProvider} from "../contexts/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import {Box} from "@mui/material";
import Header from "../components/Header/Header";

const LayoutProvider = () => {

    const [menuOpened, setMenuOpened] = useState<boolean>(true);

    const handleToggleMenu = () => {
        setMenuOpened(current => !current)
    };

    return (
        <AuthProvider>
            <Box style={{height: "100%", display: "flex"}}>
                <Navbar menuOpened={menuOpened}/>
                <Box style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                    <Header toggleMenu={handleToggleMenu}/>
                    <Box style={{
                        padding: '2rem',
                        backgroundColor: "#f1f1f1",
                        height: "calc(100% - 70px)",
                        maxHeight: "calc(100% - 70px)",
                        overflow: "auto"
                    }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </AuthProvider>
    );
};

export default LayoutProvider;