import React, { useState } from 'react';
import '../components/CreateTeams'
import '../App.css'
import CreateTeams from '../components/CreateTeams';

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () =>{
    setIsModalOpen(true);
  }

  const closeModal =() =>{
    setIsModalOpen(false);
  }


  return (
    <div className='flex flex-col h-screen justify-center items-center bg-slate-200'>
      <div className=''>
        <h1 className='text-3xl font-sans font-bold my-4'>Welcome to Admin Dashboard</h1>
      </div>

      <div className="">
        <button className="bg-blue-400 px-3 py-2 rounded-2xl text-white" onClick={openModal}>
          Enter Teams Name
        </button>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="relative p-4 w-full max-w-md">
          
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              
              <div className="p-4 md:p-5">
              
                <CreateTeams closeModal={closeModal} />
                
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Admin;
