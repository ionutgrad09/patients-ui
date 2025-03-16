import React, {FC, useContext, useEffect, useState} from 'react'
import {Avatar, Box, Divider, ListItemIcon, ListItemText, MenuItem, MenuList} from "@mui/material";
import {AuthContext} from "../../contexts/AuthProvider";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../utils/routes";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styled from "styled-components";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BusinessIcon from '@mui/icons-material/Business';
import {JWT} from "../../utils/constants";
import ElderlyIcon from '@mui/icons-material/Elderly';
import GroupIcon from '@mui/icons-material/Group';
import {hasAccess} from "../../utils/permissions";
import {AppPermission} from "../../utils/types";

interface BoxProps {
    expanded: boolean;
}

const StyledBox = styled.div<BoxProps>`
  width: ${({expanded}) => (expanded ? "150px" : "50px")};
  height: 50px;
  //transition: width 0.5s ease-in-out 0.3s; /* 0.3s delay */
`;

interface NavbarProps {
    menuOpened: boolean
}

const Navbar: FC<NavbarProps> = ({menuOpened}) => {
    const [menuWidth, setMenuWidth] = useState<number>(300)

    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleMenuClick = (route: string) => {
        navigate(route);
    }

    const isSelected = (routes: string[]) => {
        const currentPath = window.location.pathname;

        // Convert each route in the list to a regular expression
        const regexRoutes = routes.map(route => {
            // Replace dynamic segments (e.g., :id) with a regex pattern
            return new RegExp('^' + route.replace(/(:\w+)/g, '([^/]+)') + '$');
        });

        // Check if the current path matches any of the regex patterns
        return regexRoutes.some(regex => regex.test(currentPath));
    };


    const handleLogout = () => {
        localStorage.removeItem(JWT);
        setUser(null);
        navigate(ROUTES.Login);
    }

    useEffect(() => {
        setMenuWidth(menuOpened ? 300 : 60)
    }, [menuOpened])

    return (
        <StyledBox expanded={menuOpened} style={{
            borderRight: "1px solid grey",
            display: "flex",
            flexDirection: "column",
            height: "auto",
            width: `${menuWidth}px`,
            // backgroundColor: "#e8f4f8",
            background: "linear-gradient(to right, #E8F4F8, #CBE7F0)",
            gap: "10px"
        }}>

            <Box style={{display: "flex", flexDirection: "column", gap: "30px", height: "200px"}}>

                {
                    menuOpened &&
                    <>
                        <Box style={{display: "flex", justifyContent: "center"}}>
                            <h3>APLICATIE PACIENTI</h3>
                        </Box>

                        <Box style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                            {user && <Avatar sx={{height: '70px', width: '70px'}}>{user?.firstName[0] + user?.lastName[0]}</Avatar>}
                            <p><b>{user?.username}</b></p>
                        </Box>
                    </>
                }
            </Box>
            <Divider/>
            <MenuList>
                {hasAccess(AppPermission.VIEW_PATIENT, user) &&
                    <MenuItem style={{height: "50px"}} selected={isSelected([ROUTES.Patients, ROUTES.Patient])}
                              onClick={() => handleMenuClick(ROUTES.Patients)}>
                        <ListItemIcon>
                            <ElderlyIcon/>
                        </ListItemIcon>
                        {menuOpened && <ListItemText>Pacienti</ListItemText>}
                    </MenuItem>}
                {hasAccess(AppPermission.CREATE_PATIENT, user) &&
                    <MenuItem style={{height: "50px"}} selected={isSelected([ROUTES.AddPatient, ROUTES.EditPatient])}
                              onClick={() => handleMenuClick(ROUTES.AddPatient)}>
                        <ListItemIcon>
                            <PersonAddAlt1Icon/>
                        </ListItemIcon>
                        {menuOpened && <ListItemText>Gestionare</ListItemText>}
                    </MenuItem>}
                {hasAccess(AppPermission.VIEW_USER, user) &&
                    <MenuItem style={{height: "50px"}} selected={isSelected([ROUTES.Users])}
                              onClick={() => handleMenuClick(ROUTES.Users)}>
                        <ListItemIcon>
                            <GroupIcon/>
                        </ListItemIcon>
                        {menuOpened && <ListItemText>Utilizatori</ListItemText>}
                    </MenuItem>}
                {hasAccess(AppPermission.VIEW_UNIT, user) &&
                    <MenuItem style={{height: "50px"}} selected={isSelected([ROUTES.Units])}
                              onClick={() => handleMenuClick(ROUTES.Units)}>
                        <ListItemIcon>
                            <BusinessIcon/>
                        </ListItemIcon>
                        {menuOpened && <ListItemText>Unitati</ListItemText>}
                    </MenuItem>}
                <Divider/>
                <MenuItem style={{height: "50px"}} onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small"/>
                    </ListItemIcon>
                    {menuOpened && <ListItemText>Logout</ListItemText>}
                </MenuItem>
            </MenuList>
        </StyledBox>
    );
}

export default Navbar