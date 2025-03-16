import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login"
import Patients from "./pages/Patients/Patients";
import {ROUTES} from "./utils/routes";
import Units from "./pages/Units/Units";
import NotFound from "./pages/NotFound/NotFound";
import Patient from "./pages/Patient/PatientDailyStatus";
import AddPatient from "./pages/AddPatient/AddPatient";
import LayoutProvider from "./hoc/LayoutProvider";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import Users from "./pages/Users/Users";
import withGuard from "./hoc/withGuard";
import {AppPermission} from "./utils/types";
import Status from "./pages/Status/Status";
import {ToastContainer} from "react-toastify";


const GuardedPatients = withGuard(Patients, AppPermission.VIEW_PATIENT);
const GuardedPatient = withGuard(Patient, AppPermission.VIEW_PATIENT);
const GuardedAddPatient = withGuard(AddPatient, AppPermission.CREATE_PATIENT);
const GuardedUnits = withGuard(Units, AppPermission.VIEW_UNIT);
const GuardedUsers = withGuard(Users, AppPermission.VIEW_USER);

function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ToastContainer
                theme="colored"
                autoClose={2500}
            />
            <Router>
                <Routes>
                    <Route element={<LayoutProvider/>}>
                        <Route path={ROUTES.Patients} element={<GuardedPatients/>}/>
                        <Route path={ROUTES.Patient} element={<GuardedPatient/>}/>
                        <Route path={ROUTES.AddPatient} element={<GuardedAddPatient/>}/>
                        <Route path={ROUTES.EditPatient} element={<GuardedAddPatient/>}/>

                        <Route path={ROUTES.Units} element={<GuardedUnits/>}/>

                        <Route path={ROUTES.Users} element={<GuardedUsers/>}/>
                        <Route path="*" element={<NotFound/>}/>

                    </Route>

                    <Route path={ROUTES.Login} element={<Login/>}/>
                    <Route path={ROUTES.ViewStatus} element={<Status />} />
                    <Route path="" element={<Navigate to={ROUTES.Patients}/>}/>
                </Routes>
            </Router>
        </LocalizationProvider>
    );
}

export default App;
