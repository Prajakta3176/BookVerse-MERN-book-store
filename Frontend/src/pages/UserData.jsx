import React, { forwardRef } from 'react';
import { IoClose } from 'react-icons/io5';

const UserData = forwardRef(({ userDivData, userDiv, setUserDiv }, ref) => {
  return (
    <div
      ref={ref}
      className={`${userDiv} fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center transition-opacity duration-300`}
    >
      <div className="relative bg-white text-black p-6 rounded-2xl w-[90%] md:w-[40%] shadow-2xl animate-fadeIn">
        {/* Close button */}
        <button
          onClick={() => setUserDiv("hidden")}
          className="absolute top-3 right-3 text-2xl text-red-500 hover:text-red-700 transition"
          aria-label="Close"
        >
          <IoClose />
        </button>

        {/* Content */}
        <h2 className="text-2xl font-bold mb-6 text-center border-b pb-2 text-zinc-800">User Information</h2>

        <div className="space-y-4 text-[1rem]">
          <p><span className="font-semibold text-zinc-700">👤 Name:</span> {userDivData?.username}</p>
          <p><span className="font-semibold text-zinc-700">📧 Email:</span> {userDivData?.email}</p>
          <p><span className="font-semibold text-zinc-700">🆔 User ID:</span> <span className="break-all">{userDivData?._id}</span></p>
          <p><span className="font-semibold text-zinc-700">📍Address:</span> <span className="break-all">{userDivData?.address}</span></p>
        </div>
      </div>
    </div>
  );
});

export default UserData;
