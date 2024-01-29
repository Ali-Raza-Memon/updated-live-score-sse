import React, { useState, useEffect } from "react";

const CreatedTeamsAdmin = () => {
  // Retrieve teams from localStorage on component mount
  const storedTeams = localStorage.getItem("receivedTeams");
  const initialTeams = storedTeams ? JSON.parse(storedTeams) : { team1: "", team2: "" };
  const [receivedTeams, setReceivedTeams] = useState(initialTeams);

  const [team, setTeam] = useState({ team1: 0, team2: 0 });
  const [team1Update, setTeam1Update] = useState({ team: "team1", score: 0 });
  const [team2Update, setTeam2Update] = useState({ team: "team2", score: 0 });

  const handleScoreUpdate = (teamUpdate, team) => {
    // Send the score update to the backend
    fetch("http://localhost:5000/update-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team: teamUpdate.team,
        score: teamUpdate.score,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(`Error updating score for ${team}`, err);
      });
  };

  useEffect(() => {
    // Create an EventSource to listen for updates
    const eventSource = new EventSource("http://localhost:5000/get-teams-updates");

    // Event Listener for incoming updates
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setReceivedTeams(data);

      // Save the received teams to localStorage
      localStorage.setItem("receivedTeams", JSON.stringify(data));

      // Check the team from the backend
      console.log("Teams are:", data);
      // You can update your state or perform other actions based on the received data
    };

    // Clean up the EventSource on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    // Create an EventSource to listen for updates
    const eventSource = new EventSource("http://localhost:5000/get-score-updates");

    // Event listener for incoming updates
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Check the team from the backend
      if (data.team === "team1") {
        setTeam((prevTeam) => {
          const updatedTeam = { ...prevTeam, team1: data.score };
          // Save updated scores to localStorage
          localStorage.setItem("teamScores", JSON.stringify(updatedTeam));
          return updatedTeam;
        });
      } else if (data.team === "team2") {
        setTeam((prevTeam) => {
          const updatedTeam = { ...prevTeam, team2: data.score };
          // Save updated scores to localStorage
          localStorage.setItem("teamScores", JSON.stringify(updatedTeam));
          return updatedTeam;
        });
      }
    };

    // Clean up the EventSource on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="flex h-screen">
      <h1></h1>
      <div className="w-2/4 ">
        <h1 className="flex justify-center font-bold">Server Side</h1>
        <div className="">
          <h1 className="flex justify-center pt-28 font-bold text-2xl font-serif">Live Score App</h1>
          <label className="flex justify-center my-3"> Team-01 score is : {team.team1} </label>
          <label className="flex justify-center "> Team-02 score is : {team.team2}</label>
        </div>
      </div>

      <div className="w-2/4">
        <h1 className="flex justify-center font-bold">Client Side</h1>
        <div className="flex flex-col items-center my-28 h-screen">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-bold">{receivedTeams.team1} vs {receivedTeams.team2}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Update Score"
              value={team1Update.score}
              onChange={(e) => setTeam1Update({ ...team1Update, score: e.target.value })}
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
              onChange={(e) => setTeam2Update({ ...team2Update, score: e.target.value })}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              onClick={() => handleScoreUpdate(team2Update, "team2")}
              className="bg-blue-500 px-3 py-2 rounded-2xl text-white">
              Update Score Team-02
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedTeamsAdmin;
