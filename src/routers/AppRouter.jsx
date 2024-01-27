import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatedTeamsAdmin from '../pages/CreatedTeamsAdmin';
import Admin from '../pages/Admin';
import '../App.css'
import Client from '../pages/Client';




const AppRouter = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element = {<Client/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/admin-dashboard" element={ <CreatedTeamsAdmin /> } />
            </Routes>
        </Router>
    )

}

export default AppRouter;