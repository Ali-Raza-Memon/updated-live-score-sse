import { React, createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export const useTeamContext = () =>{
    return useContext(TeamContext);
}

export const TeamProvider = ({ children })=>{
    
    const [teams, setTeams] = useState({team1: '', team2: ''});

    const updateTeams = (newTeams)=>{
        setTeams(newTeams);
    };

    return(
        <TeamContext.Provider value={{ teams, updateTeams }}>
            {children}
        </TeamContext.Provider>
    );
};