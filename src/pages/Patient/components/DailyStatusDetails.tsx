import React, {FC, useContext} from "react";
import {Box, Button, Skeleton, TextField} from "@mui/material";
import {DailyStatus} from "../../../utils/types";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AuthContext} from "../../../contexts/AuthProvider";


export interface ValidationErrors {
    healthCondition?: string;
    medication?: string;
    meals?: string;
    activities?: string;
    mentions?: string;
    assignedTo?: string;
}

interface Props {
    dailyStatus: DailyStatus | null;
    updateDailyStatus: (dailyStatus: DailyStatus) => void;
    handleDateChanged: (timestamp: number) => void;
    readonly: boolean;
    validationErrors: ValidationErrors;
    isObserver?: boolean;
}

const DailyStatusDetails: FC<Props> = ({
                                           dailyStatus,
                                           updateDailyStatus,
                                           handleDateChanged,
                                           readonly,
                                           validationErrors,
                                           isObserver
                                       }) => {
    const {user} = useContext(AuthContext);

    const handleFieldChange = (field: keyof DailyStatus, value: string) => {
        updateDailyStatus({...dailyStatus!, [field]: value});
    };

    return (
        !dailyStatus ? <Skeleton style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "65%",
            backgroundColor: "white",
            padding: "20px",
            alignItems: "center",
            borderRadius: "5px",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
            gap: "20px"
        }}/> : <Box style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "65%",
            backgroundColor: "white",
            padding: "20px",
            alignItems: "center",
            borderRadius: "5px",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
            gap: "20px"
        }}>
            <Box style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                {dailyStatus.assignedTo || isObserver ? (
                    <h3>Preluat de: {dailyStatus.assignedTo || "-"}</h3>
                ) : (
                    <Box>
                        <Button
                            disabled={readonly}
                            variant="contained"
                            onClick={() => handleFieldChange("assignedTo", user!.username)}
                        >
                            MONITORIZEAZA
                        </Button>
                    </Box>
                )}
                <DatePicker
                    value={dayjs(dayjs.unix(dailyStatus.timestamp / 1000).format('YYYY-MM-DD'))}
                    format="DD/MM/YYYY"
                    label="Data"
                    maxDate={dayjs().startOf("day")}
                    onChange={(e) => handleDateChanged(e ? e.startOf("day").unix() * 1000 : Date.now())}
                />
            </Box>

            {!dailyStatus.assignedTo && !readonly &&
                <p><i>Nota: Ca sa poti modifica statusul pacientului pentru aceasta zi, trebuie mai intai sa fie
                    monitorizat de catre tine!</i></p>}
            <TextField
                disabled={readonly || !dailyStatus.assignedTo}
                required
                style={{width: "100%"}}
                label="Stare de sănătate"
                onChange={(e) => handleFieldChange("healthCondition", e.target.value)}
                multiline
                value={dailyStatus.healthCondition || ""}
                rows={5}
                error={!!validationErrors.healthCondition}
                helperText={validationErrors.healthCondition}
            />
            <TextField
                disabled={readonly || !dailyStatus.assignedTo}
                required
                style={{width: "100%"}}
                label="Medicație"
                onChange={(e) => handleFieldChange("medication", e.target.value)}
                multiline
                value={dailyStatus.medication || ""}
                rows={5}
                error={!!validationErrors.medication}
                helperText={validationErrors.medication}
            />
            <TextField
                disabled={readonly || !dailyStatus.assignedTo}
                required
                style={{width: "100%"}}
                label="Alimentație"
                onChange={(e) => handleFieldChange("meals", e.target.value)}
                multiline
                value={dailyStatus.meals || ""}
                rows={5}
                error={!!validationErrors.meals}
                helperText={validationErrors.meals}
            />
            <TextField
                required
                disabled={readonly || !dailyStatus.assignedTo}
                style={{width: "100%"}}
                label="Activități"
                onChange={(e) => handleFieldChange("activities", e.target.value)}
                multiline
                value={dailyStatus.activities || ""}
                rows={5}
                error={!!validationErrors.activities}
                helperText={validationErrors.activities}
            />
            <TextField
                disabled={readonly || !dailyStatus.assignedTo}
                required
                style={{width: "100%"}}
                label="Mențiuni"
                onChange={(e) => handleFieldChange("mentions", e.target.value)}
                multiline
                value={dailyStatus.mentions || ""}
                rows={5}
                error={!!validationErrors.mentions}
                helperText={validationErrors.mentions}
            />
        </Box>
    );
};


export default DailyStatusDetails;