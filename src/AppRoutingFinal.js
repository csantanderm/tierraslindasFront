import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFoundPage from "./Pages/404/NotFoundPage";
import Dashboard from "./Pages/dashboard/Dashboard";
import LoginPage from "./Pages/auth/loginPage";



function AppRoutingFinal() {

  let logged = true
  // TODO session storage

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={logged ? <Dashboard/> 
                  : <Navigate  to="/login" />} />
          
          
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboard" element={logged ? <Dashboard/> 
                  : <Navigate  to="/login" />}/>
          <Route path="/404" element={<NotFoundPage/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default AppRoutingFinal;
