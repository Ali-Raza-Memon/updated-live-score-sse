import React from "react";

const Client = () => {
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
              <p className="">Team-01 score is: team-01</p>
              <p className="">Team-02 score is: team-02</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
