import React, { useContext } from "react";
import { AppContext } from "../Context/AppProvider ";

const UserProfile = ({ onEdit }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="w-1/2 mx-auto mt-20 p-10 bg-white rounded-lg shadow-lg">
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img
          src={user?.avatar || "https://picsum.photos/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full shadow-md object-cover"
        />
      </div>

      {/* User Info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
