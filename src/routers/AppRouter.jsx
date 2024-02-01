import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';
import { TeamProvider } from '../context/TeamContext';
import CreatedTeamsAdmin from '../pages/CreatedTeamsAdmin';
import '../App.css'
import Client from '../pages/Client';
import Navbar from '../components/Navbar';




const AppRouter = () =>{
    return(
        <>
        
        <Navbar />
        {/* <Router>
            <TeamProvider>
            <Routes>
                <Route path="/" element = {<Client/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/admin-dashboard" element={ <CreatedTeamsAdmin /> } />
            </Routes>
            </TeamProvider>
        </Router> */}
        </>
    )

}

export default AppRouter;