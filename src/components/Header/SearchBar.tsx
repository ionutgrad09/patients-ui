import {StyledSearchBar} from "./styles";
import React, {FC, useContext} from "react";
import {SearchContext} from "../../contexts/searchContext";
import {Input} from "@mui/material";

const SearchBar: FC = () => {
    const {value, setValue} = useContext(SearchContext)

    const handleOnChange = (e: any) => {
        setValue(e.target.value)
    }

    return (
        <StyledSearchBar>

        </StyledSearchBar>
    )
}

export default SearchBar