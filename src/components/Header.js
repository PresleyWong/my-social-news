import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCredentials,
  selectCurrentUser,
} from "../redux/features/auth/authSlice";
import Searchbox from "./Searchbox";
import Navbar from "./Navbar";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const Login = () => {
    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(clearCredentials());
      navigate("/");
    };

    let output;

    if (currentUser) {
      output = (
        <Link
          className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
          to="#"
          onClick={handleLogout}
        >
          <button
            type="button"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </Link>
      );
    } else {
      output = (
        <Link
          className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
          to="/login"
        >
          <button
            type="button"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Login
          </button>
        </Link>
      );
    }
    return output;
  };

  const content = (
    <div className="mb-5">
      <div className="bg-gray-300 text-gray-600 flex justify-between items-center sm:px-4 py-2">
        <h1 className="font-bold uppercase">
          <a href="/">My Social</a>
        </h1>
        <Login />
      </div>
      <Navbar />
    </div>
  );

  return content;
};

export default Header;
