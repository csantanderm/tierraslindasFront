import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/GeneralPages/HomePage';
import Familias from './Familias';
import NewFamilyPage from '../Pages/AdminPages/NewFamilyPage';
import EditFamilyPage from '../Pages/AdminPages/EditFamilyPage';
import Generos from './Generos';
import NewGenusPage from '../Pages/AdminPages/NewGenusPage';
import EditGenusPage from '../Pages/AdminPages/EditGenusPage';
import Species from './Species';
import NewSpeciesPage from '../Pages/AdminPages/NewSpeciesPage';
import EditSpeciesPage from '../Pages/AdminPages/EditSpeciesPage';
import SpeciesDetails from './SpeciesDetails';
import ErrorPage from '../Pages/GeneralPages/ErrorPage';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import {off} from "../Store/Slices/alertSlice"

const RoutesContainer = () => {

    const user = useSelector(state => state.user);
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(off({
          open: false,
          severity:alert.alert.severity,
          message:alert.alert.message
        }))
      };

    return (
        <div>
            <Routes>
                {/* rutas generales */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/especies/detalle/:id" element={<SpeciesDetails/>}/>
                {user.user.logged 
                    ? <>
                        {/* rutas de administracion */}
                        <Route path="/familias" element={<Familias/>}/>
                        <Route path="/familias/new" element={<NewFamilyPage/>}/>
                        <Route path="/familias/:id" element={<EditFamilyPage/>}/>
                        <Route path="/generos" element={<Generos/>}/>
                        <Route path="/generos/new" element={<NewGenusPage/>}/>
                        <Route path="/generos/:id" element={<EditGenusPage/>}/>
                        <Route path="/especies" element={<Species/>}/>
                        <Route path="/especies/new" element={<NewSpeciesPage/>}/>
                        <Route path="/especies/:id" element={<EditSpeciesPage/>}/>
                    </>
                    : null
                }
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
            <Snackbar open={alert.alert.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert.alert.severity} sx={{ width: '100%' }}>
                    {alert.alert.message}
                </Alert>
            </Snackbar> 
        </div>
        
    );
}

export default RoutesContainer;
