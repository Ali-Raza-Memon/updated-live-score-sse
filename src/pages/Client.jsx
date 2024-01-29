import React from "react";
import { useState, useEffect } from "react";

const Client = () => {
  const [team, setTeam] = useState({ team1: 0, team2: 0 });

  useEffect(() => {
    // Create an EventSource to listen for updates
    const eventSource = new EventSource("http://localhost:5000/get-score-updates");

    // Event listener for incoming updates
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Check the team from the backend
      if (data.team === "team1") {
        setTeam({ ...team, team1: data.score });
      } else if (data.team === "team2") {
        setTeam({ ...team, team2: data.score });
      }
    };

    // Clean up the EventSource on component unmount
    return () => {
      eventSource.close();
    };
  }, [team, setTeam]);






  return (
    <div className="h-screen bg-slate-200">
      <div className="flex flex-col text-center py-4">
        <h1 className="text-3xl font-serif font-bold underline ">
          Welcome to Live Score App
        </h1>
        <p className="">Here is the live teams with score</p>

        <div className="flex flex-col items-center justify-center py-20">
          <h1>Team-01 vs Team-02</h1>
          <div className="h-80 w-1/2 bg-slate-400 flex items-center justify-center">
            <div className="my-12">
              <p className="">Team-01 score is: {team.team1}</p>
              <p className="">Team-02 score is: {team.team2}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
