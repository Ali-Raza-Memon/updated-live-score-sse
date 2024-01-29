import React, { useState, useEffect } from "react";

const CreatedTeamsAdmin = () => {
  const storedTeams = localStorage.getItem("receivedTeams");
  const initialTeams = storedTeams ? JSON.parse(storedTeams) : { team1: "", team2: "" };
  const [receivedTeams, setReceivedTeams] = useState(initialTeams);

  const storedTeamScores = localStorage.getItem("teamScores");
  const initialTeamScores = storedTeamScores ? JSON.parse(storedTeamScores) : { team1: 0, team2: 0 };
  const [team, setTeam] = useState(initialTeamScores);

  const [team1Update, setTeam1Update] = useState({ team: "team1", score: 0 });
  const [team2Update, setTeam2Update] = useState({ team: "team2", score: 0 });

  const handleScoreUpdate = async (teamUpdate, team) => {
    try {
      const response = await fetch("http://localhost:5000/update-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team: teamUpdate.team,
          score: teamUpdate.score,
        }),
      });

      if (response.ok) {
        console.log(`Score for ${team} updated successfully`);
      } else {
        console.error(`Error updating score for ${team}`);
      }
    } catch (error) {
      console.error(`Error updating score for ${team}`, error);
    }
  };

  const handleRefresh = async () => {
    try {
      // Reset both team scores to 0 and update in the UI
      setTeam({ team1: 0, team2: 0 });
  
      // Set input values to 0
      setTeam1Update({ team: "team1", score: 0 });
      setTeam2Update({ team: "team2", score: 0 });
  
      // Send the updated scores to the backend concurrently
      await Promise.all([
        handleScoreUpdate({ team: "team1", score: 0 }, "team1"),
        handleScoreUpdate({ team: "team2", score: 0 }, "team2"),
      ]);
  
      // Send the team names to the backend
      const response = await fetch("http://localhost:5000/update-teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team1: "Team-01",
          team2: "Team-02",
        }),
      });
  
      if (response.ok) {
        console.log("Teams updated successfully");
      } else {
        console.error("Error updating teams");
      }
    } catch (error) {
      console.error("Error during refresh", error);
    }
  };
  

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/get-teams-updates");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setReceivedTeams(data);
      localStorage.setItem("receivedTeams", JSON.stringify(data));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/get-score-updates");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.team === "team1" || data.team === "team2") {
        setTeam((prevTeam) => {
          const updatedTeam = { ...prevTeam, [data.team]: data.score };
          localStorage.setItem("teamScores", JSON.stringify(updatedTeam));
          return updatedTeam;
        });
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-2/4">
        <h1 className="flex justify-center font-bold">Server Side</h1>
        <div>
          <h1 className="flex justify-center pt-28 font-bold text-2xl font-serif">
            Live Score App
          </h1>
          <label className="flex justify-center my-3"> Team-01 score is : {team.team1} </label>
          <label className="flex justify-center "> Team-02 score is : {team.team2}</label>
        </div>
      </div>

      <div className="w-2/4">
        <h1 className="flex justify-center font-bold">Client Side</h1>
        <div className="flex flex-col items-center my-28 h-screen">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-bold">
              {receivedTeams.team1} vs {receivedTeams.team2}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Update Score"
              value={team1Update.score}
              onChange={(e) =>
                setTeam1Update({ ...team1Update, score: e.target.value })
              }
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />

            <button
              onClick={() => handleScoreUpdate(team1Update, "team1")}
              className="bg-blue-500 px-3 py-2 rounded-2xl text-white">
              Update Score Team-01
            </button>
          </div>

          <div className="flex items-center space-x-4 my-4">
            <input
              type="number"
              placeholder="Update Score"
              value={team2Update.score}
              onChange={(e) =>
                setTeam2Update({ ...team2Update, score: e.target.value })
              }
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              onClick={() => handleScoreUpdate(team2Update, "team2")}
              className="bg-blue-500 px-3 py-2 rounded-2xl text-white">
              Update Score Team-02
            </button>
          </div>
          <button className="bg-slate-500 my-7" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatedTeamsAdmin;
