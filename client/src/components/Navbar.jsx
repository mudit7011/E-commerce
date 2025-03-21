import React, { createContext } from "react";
import { assets } from "../assets /assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    createContext(AppContext);

  return (
    <div className="w-full flex justify-between items-center px-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className="w-28 h-25" />
      {userData ? (
        <div>{userData.name[0].toUpperCase()}</div>
      ) : (
        <button
          className="flex items-center gap-2 border border-gray-500 px-6 py-2 text-gray-800 rounded-full cursor-pointer hover:bg-gray-100 transition-all"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
