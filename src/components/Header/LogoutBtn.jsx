import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="relative inline-block px-6 py-2 transition-all duration-300 bg-transparent text-white border border-white/30 rounded-lg overflow-hidden group"
      onClick={logoutHandler}
    >
      Logout
      <span className="absolute inset-0 w-full h-full border-2 border-transparent rounded-lg group-hover:border-white/50"></span>
      <span className="absolute top-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
      <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
      <span className="absolute top-0 left-0 h-0 w-[2px] bg-white transition-all duration-300 group-hover:h-full"></span>
      <span className="absolute bottom-0 right-0 h-0 w-[2px] bg-white transition-all duration-300 group-hover:h-full"></span>
    </button>
  );
}

export default LogoutBtn;
