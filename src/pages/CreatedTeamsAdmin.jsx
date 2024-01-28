import React from "react";
import { useTeamContext } from "../context/TeamContext";

const CreatedTeamsAdmin = () => {

  const { teams } = useTeamContext();

  return (
    
    <div className="flex h-screen">

        <div className="w-2/4  ">
            <div className="">
                <h1 className="flex justify-center pt-28 font-bold text-2xl font-serif">Live Score App</h1>
                <label className="flex justify-center my-3"> Team-01 score is : team1 </label>
                <label className="flex justify-center "> Team-02 score is : team2</label>
            </div>
        </div>

    <div className="w-2/4">
    <div className="flex flex-col items-center my-28 h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold">{teams.team1} vs {teams.team2}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="number"
          placeholder="Update Score"
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />

        <button className="bg-blue-500 px-3 py-2 rounded-2xl text-white">
          Update Score Team-01
        </button>
      </div>

      <div className="flex items-center space-x-4 my-4">
        <input
          type="number"
          placeholder="Update Score"
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        <button className="bg-blue-500 px-3 py-2 rounded-2xl text-white">
          Update Score Team-02
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default CreatedTeamsAdmin;
