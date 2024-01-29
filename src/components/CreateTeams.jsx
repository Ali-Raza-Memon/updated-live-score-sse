import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeamContext } from "../context/TeamContext";

const CreateTeams = ({ closeModal }) => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState({
    team1: '',
    team2: '',
  });

  const handleChange = (e) => {
    setTeams({
      ...teams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/update-teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team1: teams.team1,
          team2: teams.team2,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate("/admin-dashboard");
        closeModal();
      } else {
        alert("Failed to create teams. Please try again");
      }
    } catch (error) {
      console.log("Error sending teams to the backend:", error);
      alert("An error occurred. Please try again later");
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">
          Live Score App
        </h3>
        <button
          onClick={closeModal}
          type="button"
          className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      {/* Modal body */}
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Your form content here */}
          <div>
            <label
              htmlFor="team1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Team
            </label>
            <input
              type="text"
              name="team1"
              id="team1"
              value={teams.team1}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="e.g Pakistan"
              required
            />
          </div>
          <div>
            <label
              htmlFor="team2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Second Team
            </label>
            <input
              type="text"
              name="team2"
              id="team2"
              value={teams.team2}
              onChange={handleChange}
              placeholder="e.g India"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Teams
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeams;
