import React, { useState, useEffect } from "react";
import backgroundImage from "../images/otherOne.webp";

const Client = () => {
  // Retrieve initial scores and teams from localStorage on component mount
  const storedScores = localStorage.getItem("teamScores");
  const initialScores = storedScores
    ? JSON.parse(storedScores)
    : { team1: 0, team2: 0 };

  const storedTeams = localStorage.getItem("receivedTeams");
  const initialTeams = storedTeams
    ? JSON.parse(storedTeams)
    : { team1: "", team2: "" };

  const [team, setTeam] = useState(initialScores);
  const [receivedTeams, setReceivedTeams] = useState(initialTeams);

  useEffect(() => {
    // Create an EventSource to listen for score updates
    const scoreEventSource = new EventSource(
      "http://localhost:5000/get-score-updates"
    );

    // Event listener for incoming score updates
    scoreEventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Check the team from the backend
      if (data.team === "team1" || data.team === "team2") {
        setTeam((prevTeam) => ({
          ...prevTeam,
          [data.team]: data.score,
        }));

        // Save updated scores to localStorage
        localStorage.setItem(
          "teamScores",
          JSON.stringify({
            ...initialScores,
            [data.team]: data.score,
          })
        );
      }
    };

    // Clean up the EventSource on component unmount
    return () => {
      scoreEventSource.close();
    };
  }, [initialScores]);

  useEffect(() => {
    // Create an EventSource to listen for teams updates
    const teamsEventSource = new EventSource(
      "http://localhost:5000/get-teams-updates"
    );

    // Event listener for incoming teams updates
    teamsEventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setReceivedTeams(data);

      // Save the received teams to localStorage
      localStorage.setItem("receivedTeams", JSON.stringify(data));

      // Check the teams from the backend
      console.log("Teams are:", data);
      // You can update your state or perform other actions based on the received data
    };

    // Clean up the EventSource on component unmount
    return () => {
      teamsEventSource.close();
    };
  }, []);

 
  return (
    <div className="flex flex-col items-center h-screen overflow-hidden" style={{ backgroundColor: '#8FD0E3' }}>

      <div className="my-2">
      <h1 className="text-3xl font-serif font-bold underline">
            Welcome to Live Score App
          </h1>
      </div>

      <div className="flex flex-row w-full h-full">
        <div className="w-1/2">
          <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col text-center py-4 w-1/2 h-full">
         

          <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-3xl font-bold font-serif">
              {receivedTeams.team1} vs {receivedTeams.team2}
            </h1>
            <div className="h-80 w-1/2 flex items-center justify-center">
              <div className="my-12">
                <p className="">
                  {receivedTeams.team1} score is: <strong>{team.team1}</strong>{" "}
                </p>
                <p className="">
                  {receivedTeams.team2} score is: <strong>{team.team2}</strong>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
