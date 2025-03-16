import React, {FC} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {Box} from "@mui/material";

interface HeaderProps {
    toggleMenu: () => void;
}

const Header: FC<HeaderProps> = ({toggleMenu}) => {

    return (
        <Box style={{
            minHeight: "70px",
            maxHeight: "70px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            paddingLeft: "10px",
            borderBottom: "1px solid grey"
        }}>
            <MenuIcon style={{fontSize: "30px"}} onClick={toggleMenu}/>
        </Box>
    )
}

export default Header