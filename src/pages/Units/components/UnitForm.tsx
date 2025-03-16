import {Box, Button, Dialog, DialogActions, DialogTitle, TextField} from "@mui/material";
import React, {FC} from "react";

interface Props {
    unitId: number | null;
    closeModal: () => void,
    modalOpened: boolean,
    handleSave: () => void,
    unitName: string,
    setUnitName: (newUnitName: string) => void
}

const UnitForm: FC<Props> = ({unitId, closeModal, modalOpened, handleSave, unitName, setUnitName}) => {
    return (
        <Dialog onClose={closeModal} open={modalOpened}>
            <DialogTitle><b>{unitId ? "Editare Unitate" : "Adaugare Unitate"}</b></DialogTitle>
            <Box style={{width: "500px", padding: "20px", display: "flex", flexDirection: "column", gap: "30px"}}>
                <TextField
                    required
                    style={{width: "100%"}}
                    label="Nume"
                    onChange={(e) => setUnitName(e.target.value)}
                    value={unitName || ""}
                />

            </Box>
            <DialogActions>
                <Button onClick={closeModal} variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained">
                    Salveaza
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UnitForm;