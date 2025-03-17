import {Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, TextField} from "@mui/material";
import React, {FC, useState} from "react";

interface Props {
    unitId: number | null;
    closeModal: () => void,
    modalOpened: boolean,
    handleSave: () => void,
    unitName: string,
    setUnitName: (newUnitName: string) => void,
    loading: boolean
}

const UnitForm: FC<Props> = ({unitId, closeModal, modalOpened, handleSave, unitName, setUnitName, loading}) => {
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const handleNameChanged = (newName: string) => {
        setIsDirty(true);
        setUnitName(newName);
    }

    return (
        <Dialog onClose={closeModal} open={modalOpened}>
            {loading && <CircularProgress size={60} style={{position: "absolute", top: "40%", left: "42%"}}/>}
            <DialogTitle><b>{unitId ? "Editare Unitate" : "Adaugare Unitate"}</b></DialogTitle>
            <Box style={{width: "500px", padding: "20px", display: "flex", flexDirection: "column", gap: "30px"}}>
                <TextField
                    disabled={loading}
                    required
                    style={{width: "100%"}}
                    label="Nume"
                    onChange={(e) => handleNameChanged(e.target.value)}
                    value={unitName || ""}
                />

            </Box>
            <DialogActions>
                <Button onClick={closeModal} variant="contained">
                    Cancel
                </Button>
                <Button disabled={!isDirty} onClick={handleSave} variant="contained">
                    Salveaza
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UnitForm;